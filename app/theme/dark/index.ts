import { extendTheme } from 'native-base';

export const darkPalette = {
  alert: {
    error: '#a03232',
  },
  container: {
    darker: 'rgba(0,0,0,0.5)',
    dark: 'rgba(0,0,0,0.25)',
    default: '#282a36',
    light: 'rgba(255,255,255,0.05)',
    lighter: 'rgba(255,255,255,0.3)',
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
  font: {
    disabled: '#bfbfbf',
    error: '#FF454F',
    interactive: '#0071bc',
    primary: '#ffffff',
    secondary: '#A1ACB3',
  },
  primary: {
    dark: '#3a5a40',
    darker: '#344e41',
    light: '#a3b18a',
    lighter: '#dad7cd',
    pure: '#588157',
  },
};

export const darkTheme = extendTheme({
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
  colors: darkPalette,
});
