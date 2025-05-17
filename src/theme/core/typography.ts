import type { CSSObject, Breakpoint, TypographyVariantsOptions } from '@mui/material/styles';
import { pxToRem, setFont } from 'minimal-shared/utils';
import { createTheme as getTheme } from '@mui/material/styles';
import { themeConfig } from '../theme-config';

export type FontStyleExtend = {
  fontWeightSemiBold: CSSObject['fontWeight'];
  fontSecondaryFamily: CSSObject['fontFamily'];
};

export type ResponsiveFontSizesInput = Partial<Record<Breakpoint, number>>;
export type ResponsiveFontSizesResult = Record<string, { fontSize: string }>;

const defaultMuiTheme = getTheme();

function responsiveFontSizes(obj: ResponsiveFontSizesInput): ResponsiveFontSizesResult {
  const breakpoints: Breakpoint[] = defaultMuiTheme.breakpoints.keys;

  return breakpoints.reduce((acc, breakpoint) => {
    const value = obj[breakpoint];
    if (value !== undefined && value >= 0) {
      acc[defaultMuiTheme.breakpoints.up(breakpoint)] = {
        fontSize: pxToRem(value),
      };
    }
    return acc;
  }, {} as ResponsiveFontSizesResult);
}

const primaryFont = setFont(themeConfig.fontFamily.primary);
const secondaryFont = setFont(themeConfig.fontFamily.secondary);

const scaleFactor = 0.85;

const scaledPxToRem = (px: number) => pxToRem(px * scaleFactor);
export const typography: TypographyVariantsOptions = {
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',

  h1: {
    fontFamily: primaryFont,
    fontWeight: 700,
    letterSpacing: '3%',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: pxToRem(32),
    lineHeight: pxToRem(40),
    [defaultMuiTheme.breakpoints.up('sm')]: {
      fontSize: pxToRem(48),
      lineHeight: pxToRem(56),
    },
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: pxToRem(64),
      lineHeight: pxToRem(74),
      textAlign: 'left',
    },
  },

  h2: {
    fontFamily: primaryFont,
    fontWeight: 600,
    letterSpacing: '3%',
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: pxToRem(28),
    lineHeight: pxToRem(40),
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: pxToRem(36),
      lineHeight: pxToRem(48),
      textAlign: 'left',
    },
  },

  h3: {
    fontFamily: primaryFont,
    fontWeight: 600,
    letterSpacing: '3%',
    textTransform: 'uppercase',
    fontSize: pxToRem(18),
    lineHeight: 1,
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: pxToRem(24),
      lineHeight: pxToRem(30),
    },
  },

  h4: {
    fontWeight: 700,
    lineHeight: 1.4,
    fontSize: pxToRem(20),
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: pxToRem(24),
    },
  },

  h5: {
    fontWeight: 700,
    lineHeight: 1.4,
    fontSize: pxToRem(17),
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: pxToRem(20),
    },
  },

  h6: {
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: pxToRem(15),
    [defaultMuiTheme.breakpoints.up('md')]: {
      fontSize: pxToRem(16),
    },
  },

  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(15),
  },

  subtitle2: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(13),
  },

  body1: {
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: pxToRem(15),
  },

  body2: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(13),
  },

  caption: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(11),
  },

  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(11),
    textTransform: 'uppercase',
  },

  button: {
    fontWeight: 700,
    lineHeight: 1.7,
    fontSize: pxToRem(13),
    textTransform: 'unset',
  },
};