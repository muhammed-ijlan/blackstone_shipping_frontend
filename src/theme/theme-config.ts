import type { CommonColors } from '@mui/material/styles';

import type { ThemeCssVariables } from './types';
import type { PaletteColorNoChannels } from './core/palette';

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<
    'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
    PaletteColorNoChannels
  > & {
    common: Pick<CommonColors, 'black' | 'white'>;
    grey: Record<
      '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
      string
    >;
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  classesPrefix: 'minimal',
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'Inter Tight',
    secondary: 'Barlow, sans-serif',
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    primary: {
      lighter: '#E0F2FF',
      light: '#90CDF4',
      main: '#3B82F6',           // A balanced vibrant blue
      dark: '#1D4ED8',
      darker: '#1E3A8A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#F3E8FF',
      light: '#D8B4FE',
      main: '#A855F7',           // Modern purple
      dark: '#7E22CE',
      darker: '#581C87',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#E0FCFF',
      light: '#67E8F9',
      main: '#06B6D4',           // Cyan info
      dark: '#0E7490',
      darker: '#164E63',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#DCFCE7',
      light: '#86EFAC',
      main: '#22C55E',           // Keep existing success green
      dark: '#15803D',
      darker: '#14532D',
      contrastText: '#FFFFFF',
    },
    warning: {
      lighter: '#FEF9C3',
      light: '#FACC15',
      main: '#EAB308',           // Rich yellow
      dark: '#CA8A04',
      darker: '#78350F',
      contrastText: '#1C1C1C',
    },
    error: {
      lighter: '#FEE2E2',
      light: '#F87171',
      main: '#EF4444',           // Strong, clean red
      dark: '#B91C1C',
      darker: '#7F1D1D',
      contrastText: '#FFFFFF',
    },
    grey: {
      '50': '#F9FAFB',
      '100': '#F3F4F6',
      '200': '#E5E7EB',
      '300': '#D1D5DB',
      '400': '#9CA3AF',
      '500': '#6B7280',
      '600': '#4B5563',
      '700': '#374151',
      '800': '#1F2937',
      '900': '#111827',
    },
    common: { black: '#000000', white: '#FFFFFF' },
  },
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
};
