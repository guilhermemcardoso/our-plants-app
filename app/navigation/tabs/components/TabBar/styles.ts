import { StyleSheet } from 'react-native';
import palette from '~/theme/palette';

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    right: 20,
    left: 20,
    backgroundColor: palette.tabBarBackground,
    borderRadius: 15,
    height: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
