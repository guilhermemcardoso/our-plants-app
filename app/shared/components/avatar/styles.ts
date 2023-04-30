import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  levelContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 28,
    width: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  levelText: {
    fontWeight: 'bold',
  },
});

export default styles;
