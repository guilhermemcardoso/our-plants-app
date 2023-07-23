import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  avatar: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: dimens.radius.sm,
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
    shadowRadius: dimens.radius.sm,
    elevation: 2,
  },
  levelText: {
    fontWeight: 'bold',
  },
});

export default styles;
