import { extendTheme } from 'native-base';

export const lightPalette = {
  alert: {
    error: '#fca5a5',
    success: '#bbf7d0',
  },
  container: {
    darker: 'rgba(0,0,0,0.5)',
    dark: '#c5c5c5',
    default: '#dee4e7',
    light: 'rgba(255,255,255,0.3)',
    lighter: 'rgba(255,255,255,0.3)',
  },
  font: {
    disabled: '#b5b5b5',
    error: '#bf0000',
    interactive: '#0071bc',
    primary: '#2c2c2c',
    secondary: '#757575',
  },
  button: {
    text: {
      primary: '#ffffff',
      link: '#0071bc',
    },
    background: {
      primary: '#588157',
    },
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
