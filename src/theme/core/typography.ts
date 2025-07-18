import type { CSSObject, Breakpoint, TypographyVariantsOptions } from '@mui/material/styles';
import { setFont } from 'minimal-shared/utils';
import { createTheme as getTheme } from '@mui/material/styles';
import { themeConfig } from '../theme-config';

export type FontStyleExtend = {
  fontWeightSemiBold: CSSObject['fontWeight'];
  fontSecondaryFamily: CSSObject['fontFamily'];
};

const defaultMuiTheme = getTheme();

const primaryFont = setFont(themeConfig.fontFamily.primary);

export const typography: TypographyVariantsOptions = {
  fontFamily: primaryFont,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,

  h1: {
    fontWeight: 700,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      // textAlign: 'center',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '38px',
      lineHeight: '48px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      // textAlign: 'center',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      // textAlign: 'center',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '64px',
      lineHeight: '74px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
  },
  h2: {
    fontWeight: 600,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '28px',
      lineHeight: '35px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      // textAlign: 'center',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '32px',
      lineHeight: '44px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      // textAlign: 'center',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '36px',
      lineHeight: '48px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '40px',
      lineHeight: '54px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
  },
  h3: {
    fontWeight: 600,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '20px',
      lineHeight: '30px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      // textAlign: 'center',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '20px',
      lineHeight: '30px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '32px',
      lineHeight: '45px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },

  },
  h4: {
    fontWeight: 600,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '16px',
      lineHeight: '26px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      // textAlign: 'center',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '18px',
      lineHeight: '20px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '20px',
      lineHeight: '34px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
  },
  h5: {
    fontWeight: 600,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '15px',
      lineHeight: '22px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '18px',
      lineHeight: '30px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
  },
  h6: {
    fontWeight: 600,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '16px',
      lineHeight: '25px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '24px',
      lineHeight: '34px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '24px',
      lineHeight: '36px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
  },
  subtitle1: {
    fontWeight: 700,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '16px',
      lineHeight: '16px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '18px',
      lineHeight: '20px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '20px',
      lineHeight: '22px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '24px',
      lineHeight: '24px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
  },
  subtitle2: {
    fontWeight: 600,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '20px',
      lineHeight: '30px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
  },
  body1: {
    fontWeight: 500,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '14px',
      lineHeight: '25px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '15px',
      lineHeight: '24px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      // textAlign: 'center',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '16px',
      lineHeight: '28px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
  },
  body2: {
    fontWeight: 600,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '12px',
      lineHeight: '19.04px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '13px',
      lineHeight: '20px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '13px',
      lineHeight: '22px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '14px',
      lineHeight: '26px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
  },
  caption: {
    fontWeight: 400,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '10px',
      lineHeight: '12px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '10px',
      lineHeight: '14px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '11px',
      lineHeight: '16px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '12px',
      lineHeight: '18px',
      letterSpacing: '3%',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
  },
  overline: {
    fontWeight: 700,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '8px',
      lineHeight: '12px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '10px',
      lineHeight: '14px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '11px',
      lineHeight: '16px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '12px',
      lineHeight: '18px',
      letterSpacing: '3%',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
  },
  button: {
    fontWeight: 700,
    [defaultMuiTheme.breakpoints.up('xs')]: {
      fontSize: '10px',
      lineHeight: '14px',
      letterSpacing: '3%',
      textTransform: 'unset',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '3%',
      textTransform: 'unset',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '3%',
      textTransform: 'unset',
      textAlign: 'left',
    },
    [defaultMuiTheme.breakpoints.up('lg')]: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '3%',
      textTransform: 'unset',
      textAlign: 'left',
    },
  },
};