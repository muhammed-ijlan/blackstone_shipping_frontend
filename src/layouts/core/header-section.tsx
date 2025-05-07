import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Divider, Stack, useTheme } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { Logo } from '../../components/logo';
import logo from "../../assets/logo/navlogo.png";

import type { AppBarProps } from '@mui/material/AppBar';
import type { ContainerProps } from '@mui/material/Container';
import type { Theme, SxProps, CSSObject, Breakpoint } from '@mui/material/styles';

import { useScrollOffsetTop } from 'minimal-shared/hooks';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

import { layoutClasses } from './classes';

// Define navigation items with subcategories as per the image
const navItems = [
  { title: 'Home', subcategories: [] },
  {
    title: 'Company',
    subcategories: [
      {
        category: 'About Us',
        items: [
          'Purpose',
          'Vision',
          'Key Facts & Figures (At A Glance)',
        ],
      },
      {
        category: 'Our Team',
        items: ['Leadership'],
      },
      {
        category: 'Our Network',
        items: ['Interactive Map', 'Global Locations'],
      },
      {
        category: 'Certifications & Partnerships',
        items: ['Industry Certifications', 'Strategic Alliances'],
      },
    ],
  },
  {
    title: 'Services',
    subcategories: [
      {
        category: 'Ocean Freight',
        items: [
          'Full Container Load (FCL)',
          'Less Than Container Load (LCL)',
          'Breakbulk & Ro-Ro',
        ],
      },
      {
        category: 'Air Freight',
        items: ['Express Services', 'Charter Services', 'Temperature-Controlled'],
      },
      {
        category: 'Door To Door Shipments',
        items: ['Trucking, Barge & Rail Distribution', 'First-Mile Transport', 'Last-Mile Delivery'],
      },
      {
        category: 'Warehousing & Distribution',
        items: ['Storage Solutions', 'Inventory Management', 'Order Fulfillment', 'Cross-Docking'],
      },
      {
        category: 'Customs Brokerage Consultancy',
        items: ['Heavy Lift & Oversized', 'Turnkey Projects', 'Route Planning'],
      },
      {
        category: 'IT Enabled Logistics',
        items: ['Import/Export Clearance', 'Compliance & Documentation', 'Duty Management'],
      },
      {
        category: 'Sustainable Logistics',
        items: ['Integrated Solutions', 'Cost-Effective Options'],
      },
    ],
  },
  {
    title: 'Solutions',
    subcategories: [
      {
        category: 'Ocean Freight',
        items: [
          'Full Container Load (FCL)',
          'Less Than Container Load (LCL)',
          'Breakbulk & Ro-Ro',
        ],
      },
      {
        category: 'Air Freight',
        items: ['Express Services', 'Charter Services', 'Temperature-Controlled'],
      },
      {
        category: 'Door To Door Shipments',
        items: ['Trucking, Barge & Rail Distribution', 'First-Mile Transport', 'Last-Mile Delivery'],
      },
      {
        category: 'Warehousing & Distribution',
        items: ['Storage Solutions', 'Inventory Management', 'Order Fulfillment', 'Cross-Docking'],
      },
      {
        category: 'Customs Brokerage Consultancy',
        items: ['Heavy Lift & Oversized', 'Turnkey Projects', 'Route Planning'],
      },
      {
        category: 'IT Enabled Logistics',
        items: ['Import/Export Clearance', 'Compliance & Documentation', 'Duty Management'],
      },
      {
        category: 'Sustainable Logistics',
        items: ['Integrated Solutions', 'Cost-Effective Options'],
      },
    ],
  },
  {
    title: 'Technology',
    subcategories: ['Tracking System', 'Automation', 'AI Solutions', 'Data Analytics'],
  },
  {
    title: 'Quality & Sustainability',
    subcategories: ['Certifications', 'Green Logistics', 'Safety Standards', 'Compliance'],
  },
  {
    title: 'Careers',
    subcategories: ['Job Openings', 'Benefits', 'Culture', 'Apply Now'],
  },
  {
    title: 'Support',
    subcategories: ['FAQ', 'Customer Service', 'Technical Support', 'Feedback'],
  },
  {
    title: 'My Blackbox Freight',
    subcategories: ['Dashboard', 'Shipments', 'Invoices', 'Settings'],
  },
  {
    title: 'Resources',
    subcategories: ['Blog', 'Whitepapers', 'Guides', 'Case Studies'],
  },
];

// Styled components
const NavBar = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const NavItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isLastItem',
})<{ isLastItem?: boolean }>(({ theme, isLastItem }) => ({
  position: 'relative',
  display: 'inline-block',
  padding: theme.spacing(0.5, 1),
}));
const NavLink = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const SubMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen' && prop !== 'isLastItem',
})<{ isOpen: boolean; isLastItem?: boolean }>(({ theme, isOpen, isLastItem }) => ({
  position: 'absolute',
  top: '110px',
  left: '0px',
  backgroundColor: '#fff',
  padding: theme.spacing(2, 4),
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? 'visible' : 'hidden',
  transform: isOpen ? 'translateY(10px)' : 'translateY(0px)',
  transition: theme.transitions.create(['opacity', 'visibility', 'transform'], {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeIn,
  }),
  zIndex: 1000,
  width: '100%',
  minWidth: '900px',
  // borderTop: `2px solid ${theme.palette.primary.main}`,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  
}));

const SubMenuContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
  padding: theme.spacing(0, 12),
  // justifyContent: 'center',
}));

const SubMenuCategory = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  minWidth: '200px',
}));

const SubMenuCategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: '#003087',
  marginBottom: theme.spacing(1),
}));

const SubMenuItem = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  cursor: 'pointer',
  color: '#6D6E71',
  lineHeight: '1.5',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

// ----------------------------------------------------------------------

export type HeaderSectionProps = AppBarProps & {
  layoutQuery?: Breakpoint;
  disableOffset?: boolean;
  disableElevation?: boolean;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    container?: ContainerProps;
    centerArea?: React.ComponentProps<'div'> & { sx?: SxProps<Theme> };
  };
};

export function HeaderSection({
  sx,
  slots,
  slotProps,
  className,
  disableOffset,
  disableElevation,
  layoutQuery = 'md',
  ...other
}: HeaderSectionProps) {
  const { offsetTop: isOffset } = useScrollOffsetTop();
  const theme = useTheme();

  // State to track which nav item's submenu is open
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Function to handle mouse enter
  const handleMouseEnter = (title: string) => {
    setOpenSubmenu(title);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  // Function to render subcategories
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderSubcategories = (subcategories: any[]) => {
    if (typeof subcategories[0] === 'string') {
      return (

        <SubMenuContent>
          <SubMenuCategory>
            {subcategories.map((subItem: string) => (
              <SubMenuItem key={subItem}>{subItem}</SubMenuItem>
            ))}
          </SubMenuCategory>
        </SubMenuContent>
      );
    }

    return (
      <SubMenuContent>
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {subcategories.map((category: any) => (
          <SubMenuCategory key={category.category}>
            <SubMenuCategoryTitle>{category.category}</SubMenuCategoryTitle>
            {category.items.map((item: string) => (
              <SubMenuItem key={item}>{item}</SubMenuItem>
            ))}
          </SubMenuCategory>
        ))}
      </SubMenuContent>
    );
  };

  return (
    <HeaderRoot
      position="sticky"
      color="default"
      isOffset={isOffset}
      disableOffset={disableOffset}
      disableElevation={disableElevation}
      className={mergeClasses([layoutClasses.header, className])}
      sx={[
        (theme) => ({
          ...(isOffset && {
            '--color': `var(--offset-color, ${theme.vars.palette.text.primary})`,
          }),
          bgcolor:"white"
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {slots?.topArea}

      <HeaderContainer maxWidth="lg">
        {slots?.leftArea}

        <Stack width={"100%"} sx={{ mr: 1, ml: -1, [theme.breakpoints.down(layoutQuery)]: { display: 'none' } }}>
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ height: "100%" }}>
            <Stack>
              <Logo href={logo} sx={{ height: "107px", width: "107px" }} />
            </Stack>

            <Stack spacing={1} alignItems={"flex-end"} sx={{ height: "100%" }}>
              <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                <IconButton size="small" sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
                  <SearchIcon fontSize="small" />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>Search</Typography>
                </IconButton>

                <IconButton size="small" sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>Tracking</Typography>
                </IconButton>

                <IconButton size="small" sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
                  <AccountTreeIcon fontSize="small" />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>My BBX</Typography>
                </IconButton>

                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  sx={{ textTransform: 'none' }}
                  startIcon={<MailOutlineIcon />}
                >
                  Contact
                </Button>
              </Box>

              <Divider sx={{ width: "100%", borderBottomWidth: 1, borderColor: "rgba(109, 110, 113, 1)" }} />

              <NavBar>
                {navItems.map((item, index) => (
                  <div style={{paddingBottom:"15px"}}     onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}>
                  <NavItem
                    key={item.title}
                    isLastItem={index >= navItems.length - 3} 
               
                    >
                    <NavLink>{item.title}</NavLink>
                  </NavItem>
                    {item.subcategories.length > 0 && (
                      <SubMenu
                      isOpen={openSubmenu === item.title}
                      isLastItem={index >= navItems.length - 2}
                      >
                        {renderSubcategories(item.subcategories)}
                      </SubMenu>
                    )}

                    </div>
                ))}
              </NavBar>
            </Stack>
          </Stack>
        </Stack>
      </HeaderContainer>
    </HeaderRoot>
  );
}

// ----------------------------------------------------------------------

type HeaderRootProps = Pick<HeaderSectionProps, 'disableOffset' | 'disableElevation'> & {
  isOffset: boolean;
};

const HeaderRoot = styled(AppBar, {
  shouldForwardProp: (prop: string) =>
    !['isOffset', 'disableOffset', 'disableElevation', 'sx'].includes(prop),
})<HeaderRootProps>(({ isOffset, disableOffset, disableElevation, theme }) => {
  const pauseZindex = { top: -1, bottom: -2 };

  const pauseStyles: CSSObject = {
    opacity: 0,
    content: '""',
    visibility: 'hidden',
    position: 'absolute',
    transition: theme.transitions.create(['opacity', 'visibility'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
  };

  const bgStyles: CSSObject = {
    ...pauseStyles,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: pauseZindex.top,
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    backgroundColor: "white",
    ...(isOffset && {
      opacity: 1,
      visibility: 'visible',
    }),
  };

  const shadowStyles: CSSObject = {
    ...pauseStyles,
    left: 0,
    right: 0,
    bottom: 0,
    height: 24,
    margin: 'auto',
    borderRadius: '50%',
    width: `calc(100% - 48px)`,
    zIndex: pauseZindex.bottom,
    boxShadow: theme.vars.customShadows.z8,
    ...(isOffset && { opacity: 0.48, visibility: 'visible' }),
  };

  return {
    boxShadow: 'none',
    zIndex: 'var(--layout-header-zIndex)',
    ...(!disableOffset && { '&::before': bgStyles }),
    ...(!disableElevation && { '&::after': shadowStyles }),
  };
});

const HeaderContainer = styled(Container, {
  shouldForwardProp: (prop: string) => !['layoutQuery', 'sx'].includes(prop),
})<Pick<HeaderSectionProps, 'layoutQuery'>>(({ layoutQuery = 'md', theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'var(--color)',
  height: '150px !important',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up(layoutQuery)]: { height: 'var(--layout-header-desktop-height)' },
}));