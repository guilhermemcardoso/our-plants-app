import palette from '~/theme/palette';

export function getIconColor(focused: boolean) {
  return focused ? palette.tabIconFocused : palette.tabIconNotFocused;
}
