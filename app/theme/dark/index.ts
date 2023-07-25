import { extendTheme } from 'native-base';

export const darkPalette = {
  alert: {
    error: '#a03232',
    success: '#15803d',
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
    hover: 'rgba(255,255,255,0.15)',
  },
  container: {
    darker: 'rgba(0,0,0,0.5)',
    dark: 'rgba(0,0,0,0.25)',
    default: '#282a36',
    light: '#353F4D',
    lighter: '#4C5A6E',
  },
  divider: {
    primary: 'rgba(255,255,255,0.15)',
  },
  font: {
    disabled: '#bfbfbf',
    error: '#FF454F',
    success: '#35a03d',
    link: '#0071bc',
    interactive: '#649463',
    primary: '#ffffff',
    secondary: '#A1ACB3',
    progress: '#2c2c2c',
    label: '#737373',
  },
  loading: {
    background: 'rgba(0,0,0,0.75)',
    text: '#FFF',
  },
  primary: {
    dark: '#3a5a40',
    darker: '#344e41',
    light: '#a3b18a',
    lighter: '#dad7cd',
    pure: '#649463',
  },
  progress: {
    background: 'rgba(255,255,255,0.75)',
    track: '#649463',
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
