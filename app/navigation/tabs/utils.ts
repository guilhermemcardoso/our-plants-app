import { Tabs } from './constants';

export function getIconName(focused: boolean, tabName: string) {
  switch (tabName) {
    case Tabs.FAVORITES:
      return focused ? 'ios-heart-sharp' : 'ios-heart-outline';
    case Tabs.COMPLAINTS:
      return focused ? 'ios-alert-circle' : 'ios-alert-circle-outline';
    case Tabs.USER_PROFILE:
      return focused ? 'ios-person-circle' : 'ios-person-circle-outline';
    case Tabs.SETTINGS:
      return focused ? 'ios-settings' : 'ios-settings-outline';
    default:
      return focused ? 'ios-location' : 'ios-location-outline';
  }
}
