import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

export const styles = StyleSheet.create({
  default: {
    padding: dimens.padding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimens.radius.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: dimens.radius.md,
    elevation: 2,
  },
  container: {
    alignSelf: 'stretch',
  },
});
