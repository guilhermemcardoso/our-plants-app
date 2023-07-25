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
    hover: 'rgba(0,0,0,0.15)',
  },
  container: {
    darker: 'rgba(0,0,0,0.5)',
    dark: '#CED3D6',
    default: '#dee4e7',
    light: '#F0F3F3',
    lighter: 'rgba(255,255,255,1)',
  },
  divider: {
    primary: 'rgba(0,0,0,0.1)',
  },
  font: {
    disabled: '#b5b5b5',
    error: '#bf0000',
    success: '#35a03d',
    link: '#0071bc',
    interactive: '#649463',
    primary: '#2c2c2c',
    secondary: '#757575',
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
    background: 'rgba(0,0,0,0.15)',
    track: '#649463',
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
