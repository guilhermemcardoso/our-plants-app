import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

export const styles = StyleSheet.create({
  default: {
    padding: dimens.padding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  safeContainer: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
