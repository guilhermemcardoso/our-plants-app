import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: dimens.padding.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
});
