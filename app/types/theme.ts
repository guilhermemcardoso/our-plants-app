import { darkTheme } from '~/theme/dark';

export type Theme = 'dark' | 'light';

type CustomThemeType = typeof darkTheme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
