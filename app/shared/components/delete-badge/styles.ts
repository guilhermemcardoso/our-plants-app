import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: -8,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
});

export default styles;
