import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    right: 16,
    left: 16,
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
