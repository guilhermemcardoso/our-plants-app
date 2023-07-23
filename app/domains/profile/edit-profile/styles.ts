import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: dimens.radius.md,
    padding: dimens.padding.lg,
  },
  removeImageButton: {
    marginTop: dimens.margin.md,
  },
  infoContainer: {
    flex: 1,
    marginLeft: dimens.margin.lg,
  },
  sectionLabel: {
    marginBottom: dimens.margin.md,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mappedCount: {
    marginTop: dimens.margin.md,
    fontWeight: 'bold',
  },
  leftInput: {
    flex: 1,
  },
  rightInput: {
    flex: 0.4,
    marginLeft: dimens.margin.md,
  },
  editButton: {
    marginTop: dimens.margin.lg,
    marginBottom: dimens.margin.xl,
  },
  divider: {
    marginVertical: dimens.margin.lg,
  },
  infoCard: {
    marginTop: dimens.margin.lg,
  },
  profileContainer: {
    padding: dimens.padding.lg,
    borderRadius: dimens.radius.md,
    marginTop: dimens.margin.lg,
  },
  fieldLabel: {
    marginBottom: dimens.margin.sm,
    fontWeight: 'bold',
  },
});

export default styles;
