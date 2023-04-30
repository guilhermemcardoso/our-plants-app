import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

export const styles = StyleSheet.create({
  default: {
    padding: dimens.padding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
  },
  container: {
    alignSelf: 'stretch',
  },
});
