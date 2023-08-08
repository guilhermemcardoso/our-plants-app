import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimens.radius.md,
    padding: dimens.padding.lg,
  },
  title: {
    marginBottom: dimens.margin.xl,
  },
  description: {
    lineHeight: 28,
    textAlign: 'center',
  },
});

export default styles;
