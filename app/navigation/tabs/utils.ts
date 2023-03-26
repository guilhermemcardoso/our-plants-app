import { Tabs } from './constants';

export function getIconName(focused: boolean, tabName: string) {
  switch (tabName) {
    case Tabs.FAVORITES:
      return focused ? 'ios-star' : 'ios-star-outline';
    case Tabs.PROFILE:
      return focused ? 'ios-person' : 'ios-person-outline';
    case Tabs.SETTINGS:
      return focused ? 'ios-settings' : 'ios-settings-outline';
    default:
      return focused ? 'ios-leaf' : 'ios-leaf-outline';
  }
}
