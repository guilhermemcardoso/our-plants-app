import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  sectionLabel: {
    marginBottom: dimens.margin.md,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  createButton: {
    marginTop: dimens.margin.lg,
    marginBottom: dimens.margin.xl,
  },
  infoContainer: {
    padding: dimens.padding.lg,
    borderRadius: dimens.radius.md,
    marginTop: dimens.margin.lg,
  },
  descriptionInput: {
    marginTop: dimens.margin.lg,
  },
  fieldLabel: {
    marginBottom: dimens.margin.sm,
    fontWeight: 'bold',
  },
});

export default styles;
