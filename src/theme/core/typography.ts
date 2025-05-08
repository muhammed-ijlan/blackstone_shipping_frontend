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
    fontWeight: 800,
    lineHeight: 1.2,
    fontSize: scaledPxToRem(40), // original: 40px → reduced: 34px
    ...responsiveFontSizes({ xs: 34, sm: 44, md: 49, lg: 54 }), // originally: xs: 40, sm: 52, md: 58, lg: 64
  },
  h2: {
    fontFamily: primaryFont,
    fontWeight: 800,
    lineHeight: 1.3,
    fontSize: scaledPxToRem(32), // original: 32px → reduced: 27px
    ...responsiveFontSizes({ xs: 27, sm: 31, md: 34, lg: 37 }), // originally: 32, 36, 40, 44
  },
  h3: {
    fontFamily: primaryFont,
    fontWeight: 700,
    lineHeight: 1.4,
    fontSize: scaledPxToRem(24), // ori ginal: 24px → reduced: 20px
    ...responsiveFontSizes({ xs: 20, sm: 22, md: 24, lg: 26 }), // originally: 24, 26, 28, 30
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: scaledPxToRem(20), // original: 20px → reduced: 17px
    ...responsiveFontSizes({ xs: 17, sm: 19, md: 20 }), // originally: 20, 22, 24
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: scaledPxToRem(18), // original: 18px → reduced: 15px
    ...responsiveFontSizes({ xs: 15, sm: 16 }), // originally: 18, 19
  },
  h6: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: scaledPxToRem(16), // original: 16px → reduced: 13.6px
    ...responsiveFontSizes({ xs: 14, sm: 15, md: 15 }), // originally: 16, 17, 18
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: scaledPxToRem(16), // original: 16px → reduced: 13.6px
    ...responsiveFontSizes({ xs: 14, sm: 15 }), // originally: 16, 17
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: scaledPxToRem(14), // original: 14px → reduced: 11.9px
    ...responsiveFontSizes({ xs: 12, sm: 13 }), // originally: 14, 15
  },
  body1: {
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: scaledPxToRem(16), // original: 16px → reduced: 13.6px
    ...responsiveFontSizes({ xs: 14, sm: 15 }), // originally: 16, 17
  },
  body2: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: scaledPxToRem(14), // original: 14px → reduced: 11.9px
    ...responsiveFontSizes({ xs: 12, sm: 13 }), // originally: 14, 15
  },
  caption: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: scaledPxToRem(12), // original: 12px → reduced: 10.2px
    ...responsiveFontSizes({ xs: 10, sm: 11 }), // originally: 12, 13
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: scaledPxToRem(12), // original: 12px → reduced: 10.2px
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 1.7,
    fontSize: scaledPxToRem(14), // original: 14px → reduced: 11.9px
    textTransform: 'unset',
    ...responsiveFontSizes({ xs: 12, sm: 13 }), // originally: 14, 15
  },
};
