import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  imageItem: {
    resizeMode: 'cover',
  },
  previousBtn: {
    position: 'absolute',
    left: -10,
    top: 0,
    bottom: 0,
    shadowOffset: {
      width: 3,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 1,
    elevation: 1,
  },
  nextBtn: {
    position: 'absolute',
    right: -10,
    top: 0,
    bottom: 0,
    shadowOffset: {
      width: 3,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 1,
    elevation: 1,
  },
  dots: {
    position: 'absolute',
    bottom: dimens.margin.sm,
    left: 0,
    right: 0,
  },
  noImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
