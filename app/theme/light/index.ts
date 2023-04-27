import { extendTheme } from 'native-base';

export const lightPalette = {
  alert: {
    error: '#fca5a5',
    success: '#bbf7d0',
  },
  button: {
    text: {
      primary: '#ffffff',
      link: '#0071bc',
    },
    background: {
      primary: '#588157',
      warning: '#a03232',
    },
  },
  divider: {
    primary: 'rgba(0,0,0,0.1)',
  },
  container: {
    darker: 'rgba(0,0,0,0.5)',
    dark: '#B0B5B8',
    default: '#dee4e7',
    light: '#F0F3F3',
    lighter: 'rgba(255,255,255,1)',
  },
  font: {
    disabled: '#b5b5b5',
    error: '#bf0000',
    interactive: '#0071bc',
    primary: '#2c2c2c',
    secondary: '#757575',
  },
  primary: {
    dark: '#3a5a40',
    darker: '#344e41',
    light: '#a3b18a',
    lighter: '#dad7cd',
    pure: '#588157',
  },
};

export const lightTheme = extendTheme({
  fontConfig: {
    Roboto: {
      100: {
        normal: 'Inter-Light',
        italic: 'Inter-LightItalic',
      },
      200: {
        normal: 'Inter-Light',
        italic: 'Inter-LightItalic',
      },
      300: {
        normal: 'Inter-Light',
        italic: 'Inter-LightItalic',
      },
      400: {
        normal: 'Inter-Regular',
        italic: 'Inter-Italic',
      },
      500: {
        normal: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-Medium',
        italic: 'Inter-MediumItalic',
      },
      700: {
        normal: 'Inter-Medium',
        italic: 'Inter-MediumItalic',
      },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inter',
  },
  colors: lightPalette,
});
