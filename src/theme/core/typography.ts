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

export const typography: TypographyVariantsOptions = {
  fontFamily: primaryFont,
  // fontSecondaryFamily: secondaryFont,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,

  h1: {
    // fontFamily: primaryFont,
    fontWeight: 700,
    fontSize: pxToRem(64),
    lineHeight: pxToRem(74),
    letterSpacing: '3%',
    textTransform: 'uppercase',
  },
  h2: {
    // fontFamily: primaryFont,
    fontWeight: 600,
    fontSize: pxToRem(40),
    lineHeight: pxToRem(54),
    letterSpacing: '3%',
    textTransform: 'capitalize',
  },
  h3: {
    // fontFamily: primaryFont,
    fontWeight: 600,
    fontSize: pxToRem(24),
    lineHeight: '100%',
    letterSpacing: '3%',
    textTransform: 'uppercase',
  },
  h4: {
    // fontFamily: primaryFont,
    fontWeight: 600,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(30),
    letterSpacing: '3%',
    textTransform: 'capitalize',
  },
  h5: {
    // fontFamily: primaryFont,
    fontWeight: 600,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(30),
    letterSpacing: '3%',
    textTransform: 'capitalize',
  },
  h6: {
    // fontFamily: primaryFont,
    fontWeight: 600,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(28),
    letterSpacing: '3%',
    textTransform: 'capitalize',
  },
  subtitle1: {
    // fontFamily: primaryFont,
    fontWeight: 700,
    fontSize: pxToRem(24),
    lineHeight: '100%',
    letterSpacing: '3%',
    textTransform: 'uppercase',
  },
  subtitle2: {
    // fontFamily: primaryFont,
    fontWeight: 600,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(30),
    letterSpacing: '3%',
    textTransform: 'capitalize',
  },
  body1: {
    // fontFamily: primaryFont,
    fontWeight: 500,
    fontSize: pxToRem(16),
    lineHeight: pxToRem(28),
    letterSpacing: '3%',
    textTransform: 'capitalize',
  },
  body2: {
    // fontFamily: primaryFont,
    fontWeight: 600,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(26),
    letterSpacing: '3%',
    textTransform: 'capitalize',
  },
  caption: {
    // fontFamily: primaryFont,
    fontWeight: 400,
    fontSize: pxToRem(12),
    lineHeight: pxToRem(18),
    letterSpacing: '3%',
    textTransform: 'capitalize',
  },
  overline: {
    // fontFamily: primaryFont,
    fontWeight: 700,
    fontSize: pxToRem(12),
    lineHeight: pxToRem(18),
    letterSpacing: '3%',
    textTransform: 'uppercase',
  },
  button: {
    // fontFamily: primaryFont,
    fontWeight: 700,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(20),
    letterSpacing: '3%',
    textTransform: 'unset',
  },
};