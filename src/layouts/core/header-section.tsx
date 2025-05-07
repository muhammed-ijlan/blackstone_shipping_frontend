
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { Logo } from '../../components/logo';
import logo from "../../assets/logo/navlogo.png";
import { Divider, Stack, useTheme } from '@mui/material';

const NavBar = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const NavLink = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));


import type { AppBarProps } from '@mui/material/AppBar';
import type { ContainerProps } from '@mui/material/Container';
import type { Theme, SxProps, CSSObject, Breakpoint } from '@mui/material/styles';

import { useScrollOffsetTop } from 'minimal-shared/hooks';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import AppBar from '@mui/material/AppBar';
// import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { layoutClasses } from './classes';

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
  return (
    <HeaderRoot
      position="sticky"
      color="transparent"
      isOffset={isOffset}
      disableOffset={disableOffset}
      disableElevation={disableElevation}
      className={mergeClasses([layoutClasses.header, className])}
      sx={[
        (theme) => ({
          ...(isOffset && {
            '--color': `var(--offset-color, ${theme.vars.palette.text.primary})`,
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {slots?.topArea}

      <HeaderContainer maxWidth="xl">
        {slots?.leftArea}

        <Stack width={"100%"} sx={{ mr: 1, ml: -1, [theme.breakpoints.down(layoutQuery)]: { display: 'none' } }}>
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ height: "100%" }}>

            <Stack>
              <Logo href={logo} sx={{ height: "107px", width: "107px" }} />
            </Stack>

            <Stack spacing={1} alignItems={"flex-end"} sx={{ height: "100%" }}>
              <Box sx={{ display: 'flex', gap: 1, ml: 'auto', }}>
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

              <Divider sx={{ width: "100%", borderBottomWidth: 1,borderColor:"rgba(109, 110, 113, 1)" }} />

              <NavBar>
                {[
                  'Home',
                  'Company',
                  'Services',
                  'Solutions',
                  'Technology',
                  'Quality & Sustainability',
                  'Careers',
                  'Support',
                  'My Blackbox Freight',
                  'Resources',
                ].map((item) => (
                  <NavLink key={item}>{item}</NavLink>
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
    backdropFilter: `blur(6px)`,
    WebkitBackdropFilter: `blur(6px)`,
    backgroundColor: varAlpha(theme.vars.palette.background.defaultChannel, 0.8),
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

