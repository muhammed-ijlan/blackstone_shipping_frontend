import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Divider, Stack, useTheme, Link as MuiLink } from '@mui/material';

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

// Define navigation items with subcategories and links
const navItems = [
  { title: 'Home', subcategories: [] },
  {
    title: 'Company',
    subcategories: [
      {
        category: 'About Us',
        items: [
          { text: 'Purpose', link: '/company/about-us/purpose' },
          { text: 'Vision', link: '/company/about-us/vision' },
          { text: 'Key Facts & Figures (At A Glance)', link: '/company/about-us/key-facts' },
        ],
      },
      {
        category: 'Our Team',
        items: [
          { text: 'Leadership', link: '/company/our-team/leadership' },
        ],
      },
      {
        category: 'Our Network',
        items: [
          { text: 'Interactive Map', link: '/company/our-network/interactive-map' },
          { text: 'Global Locations', link: '/company/our-network/global-locations' },
        ],
      },
      {
        category: 'Certifications & Partnerships',
        items: [
          { text: 'Industry Certifications', link: '/company/certifications/industry' },
          { text: 'Strategic Alliances', link: '/company/certifications/alliances' },
        ],
      },
    ],
  },
  {
    title: 'Services',
    subcategories: [
      {
        category: 'Ocean Freight',
        items: [
          { text: 'Full Container Load (FCL)', link: '/services/ocean-freight/fcl' },
          { text: 'Less Than Container Load (LCL)', link: '/services/ocean-freight/lcl' },
          { text: 'Breakbulk & Ro-Ro', link: '/services/ocean-freight/breakbulk-ro-ro' },
        ],
      },
      {
        category: 'Air Freight',
        items: [
          { text: 'Express Services', link: '/services/air-freight/express' },
          { text: 'Charter Services', link: '/services/air-freight/charter' },
          { text: 'Temperature-Controlled', link: '/services/air-freight/temperature-controlled' },
        ],
      },
      {
        category: 'Door To Door Shipments',
        items: [
          { text: 'Trucking, Barge & Rail Distribution', link: '/services/door-to-door/trucking' },
          { text: 'First-Mile Transport', link: '/services/door-to-door/first-mile' },
          { text: 'Last-Mile Delivery', link: '/services/door-to-door/last-mile' },
        ],
      },
      {
        category: 'Warehousing & Distribution',
        items: [
          { text: 'Storage Solutions', link: '/services/warehousing/storage' },
          { text: 'Inventory Management', link: '/services/warehousing/inventory' },
          { text: 'Order Fulfillment', link: '/services/warehousing/fulfillment' },
          { text: 'Cross-Docking', link: '/services/warehousing/cross-docking' },
        ],
      },
      {
        category: 'Customs Brokerage Consultancy',
        items: [
          { text: 'Heavy Lift & Oversized', link: '/services/customs/heavy-lift' },
          { text: 'Turnkey Projects', link: '/services/customs/turnkey-projects' },
          { text: 'Route Planning', link: '/services/customs/route-planning' },
        ],
      },
      {
        category: 'IT Enabled Logistics',
        items: [
          { text: 'Import/Export Clearance', link: '/services/it-logistics/clearance' },
          { text: 'Compliance & Documentation', link: '/services/it-logistics/compliance' },
          { text: 'Duty Management', link: '/services/it-logistics/duty-management' },
        ],
      },
      {
        category: 'Sustainable Logistics',
        items: [
          { text: 'Integrated Solutions', link: '/services/sustainable/integrated' },
          { text: 'Cost-Effective Options', link: '/services/sustainable/cost-effective' },
        ],
      },
    ],
  },
  {
    title: 'Solutions',
    subcategories: [
      {
        category: 'Ocean Freight',
        items: [
          { text: 'Full Container Load (FCL)', link: '/solutions/ocean-freight/fcl' },
          { text: 'Less Than Container Load (LCL)', link: '/solutions/ocean-freight/lcl' },
          { text: 'Breakbulk & Ro-Ro', link: '/solutions/ocean-freight/breakbulk-ro-ro' },
        ],
      },
      {
        category: 'Air Freight',
        items: [
          { text: 'Express Services', link: '/solutions/air-freight/express' },
          { text: 'Charter Services', link: '/solutions/air-freight/charter' },
          { text: 'Temperature-Controlled', link: '/solutions/air-freight/temperature-controlled' },
        ],
      },
      {
        category: 'Door To Door Shipments',
        items: [
          { text: 'Trucking, Barge & Rail Distribution', link: '/solutions/door-to-door/trucking' },
          { text: 'First-Mile Transport', link: '/solutions/door-to-door/first-mile' },
          { text: 'Last-Mile Delivery', link: '/solutions/door-to-door/last-mile' },
        ],
      },
      {
        category: 'Warehousing & Distribution',
        items: [
          { text: 'Storage Solutions', link: '/solutions/warehousing/storage' },
          { text: 'Inventory Management', link: '/solutions/warehousing/inventory' },
          { text: 'Order Fulfillment', link: '/solutions/warehousing/fulfillment' },
          { text: 'Cross-Docking', link: '/solutions/warehousing/cross-docking' },
        ],
      },
      {
        category: 'Customs Brokerage Consultancy',
        items: [
          { text: 'Heavy Lift & Oversized', link: '/solutions/customs/heavy-lift' },
          { text: 'Turnkey Projects', link: '/solutions/customs/turnkey-projects' },
          { text: 'Route Planning', link: '/solutions/customs/route-planning' },
        ],
      },
      {
        category: 'IT Enabled Logistics',
        items: [
          { text: 'Import/Export Clearance', link: '/solutions/it-logistics/clearance' },
          { text: 'Compliance & Documentation', link: '/solutions/it-logistics/compliance' },
          { text: 'Duty Management', link: '/solutions/it-logistics/duty-management' },
        ],
      },
      {
        category: 'Sustainable Logistics',
        items: [
          { text: 'Integrated Solutions', link: '/solutions/sustainable/integrated' },
          { text: 'Cost-Effective Options', link: '/solutions/sustainable/cost-effective' },
        ],
      },
    ],
  },
  {
    title: 'Technology',
    subcategories: [
      { text: 'Tracking System', link: '/technology/tracking-system' },
      { text: 'Automation', link: '/technology/automation' },
      { text: 'AI Solutions', link: '/technology/ai-solutions' },
      { text: 'Data Analytics', link: '/technology/data-analytics' },
    ],
  },
  {
    title: 'Quality & Sustainability',
    subcategories: [
      { text: 'Certifications', link: '/quality-sustainability/certifications' },
      { text: 'Green Logistics', link: '/quality-sustainability/green-logistics' },
      { text: 'Safety Standards', link: '/quality-sustainability/safety-standards' },
      { text: 'Compliance', link: '/quality-sustainability/compliance' },
    ],
  },
  {
    title: 'Careers',
    subcategories: [
      { text: 'Job Openings', link: '/careers/job-openings' },
      { text: 'Benefits', link: '/careers/benefits' },
      { text: 'Culture', link: '/careers/culture' },
      { text: 'Apply Now', link: '/careers/apply-now' },
    ],
  },
  {
    title: 'Support',
    subcategories: [
      { text: 'FAQ', link: '/support/faq' },
      { text: 'Customer Service', link: '/support/customer-service' },
      { text: 'Technical Support', link: '/support/technical-support' },
      { text: 'Feedback', link: '/support/feedback' },
    ],
  },
  {
    title: 'My Blackbox Freight',
    subcategories: [
      { text: 'Dashboard', link: '/my-blackbox-freight/dashboard' },
      { text: 'Shipments', link: '/my-blackbox-freight/shipments' },
      { text: 'Invoices', link: '/my-blackbox-freight/invoices' },
      { text: 'Settings', link: '/my-blackbox-freight/settings' },
    ],
  },
  {
    title: 'Resources',
    subcategories: [
      { text: 'Blog', link: '/resources/blog' },
      { text: 'Whitepapers', link: '/resources/whitepapers' },
      { text: 'Guides', link: '/resources/guides' },
      { text: 'Case Studies', link: '/resources/case-studies' },
    ],
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
  fontSize: "14px !important",
  fontWeight: 600,
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
  borderTop: `2px solid ${theme.palette.primary.main}`,
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

const SubMenuItem = styled(MuiLink)(({ theme }) => ({
  fontSize: 14,
  cursor: 'pointer',
  color: '#6D6E71',
  lineHeight: '1.5',
  textDecoration: 'none',
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
    if (typeof subcategories[0] === 'object' && 'text' in subcategories[0]) {
      return (
        <SubMenuContent>
          <SubMenuCategory>
            {subcategories.map((subItem: { text: string; link: string }) => (
              <SubMenuItem key={subItem.text} href={subItem.link}>
                {subItem.text}
              </SubMenuItem>
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
            {category.items.map((item: { text: string; link: string }) => (
              <SubMenuItem key={item.text} href={item.link}>
                {item.text}
              </SubMenuItem>
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
          bgcolor: "white",
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
                  <div
                    style={{ paddingBottom: "15px" }}
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
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
        <HeaderCenterArea {...slotProps?.centerArea}>{slots?.centerArea}</HeaderCenterArea>


        {slots?.rightArea}
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
  height: 'auto !important',
  padding: theme.spacing(2, 2),
  [theme.breakpoints.up(layoutQuery)]: { height: 'var(--layout-header-desktop-height)' },
}));


const HeaderCenterArea = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
}));