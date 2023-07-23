import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageItem: {
    resizeMode: 'cover',
  },
  previousBtn: {
    position: 'absolute',
    left: -10,
    top: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 1,
  },
  nextBtn: {
    position: 'absolute',
    right: -10,
    top: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 1,
  },
  dots: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
  },
  noImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
