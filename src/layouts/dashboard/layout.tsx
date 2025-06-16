import type { Breakpoint } from '@mui/material/styles';

import { merge } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';

import { useTheme } from '@mui/material/styles';

import { NavMobile } from './nav';
import { layoutClasses } from '../core/classes';
import { dashboardLayoutVars } from './css-vars';
import { MainSection } from '../core/main-section';
import { _workspaces } from '../nav-config-workspace';
import { MenuButton } from '../components/menu-button';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';

import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';
import Footer from 'src/sections/footer/Footer';
import { Box, Stack } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import logo from 'src/assets/logo/navlogo.png';
import { useQuery } from '@apollo/client';
import { GET_MENU_ITEMS } from 'src/graphql/queries';
import { MenuItem, MenuData } from 'src/types/graphql/types/menu.types';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

function buildNestedMenu(menuItems: MenuItem[]): MenuItem[] {
  const map: { [key: string]: MenuItem } = {};
  const tree: MenuItem[] = [];

  menuItems.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  menuItems.forEach(item => {
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children!.push(map[item.id]);
    } else {
      tree.push(map[item.id]);
    }
  });

  const sortByOrder = (items: MenuItem[]) => {
    items.sort((a, b) => a.order - b.order);
    items.forEach(item => {
      if (item.children && item.children.length > 0) {
        sortByOrder(item.children);
      }
    });
  };

  sortByOrder(tree);
  return tree;
}

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const theme = useTheme();
  const { data, loading, error } = useQuery<MenuData>(GET_MENU_ITEMS);

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  // Transform flat menu items to nested structure
  const nestedMenuItems = data?.menu?.menuItems?.nodes
    ? buildNestedMenu(data.menu.menuItems.nodes)
    : [];


  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      leftArea: (
        <Box
          component="img"
          sx={{ [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
          width="70px"
          src={logo}
        />
      ),

      rightArea: (
        <Stack alignItems="flex-end" sx={{ [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}>
          <Iconify
            width={30}
            icon="heroicons-outline:menu-alt-1"
            onClick={onOpen}
            sx={{ [theme.breakpoints.up(layoutQuery)]: { display: 'none' }, color: 'rgba(45, 55, 72, 1)' }}
          />
          <NavMobile
            data={nestedMenuItems}
            open={open}
            onClose={onClose}
            workspaces={_workspaces}
          />
        </Stack>
      ),
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
        data={nestedMenuItems}
      />
    );
  };

  const renderFooter = () => <Footer />;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      headerSection={renderHeader()}
      cssVars={{ ...dashboardLayoutVars(theme), ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}