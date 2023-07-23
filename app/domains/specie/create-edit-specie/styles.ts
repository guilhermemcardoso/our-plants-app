import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  infoContainer: {
    padding: dimens.padding.lg,
    borderRadius: dimens.radius.md,
    marginTop: dimens.margin.lg,
  },
  sectionLabel: {
    marginBottom: dimens.margin.md,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  createEditButton: {
    marginTop: dimens.margin.lg,
    marginBottom: dimens.margin.xl,
  },
  input: {
    marginTop: dimens.margin.lg,
  },
});

export default styles;
