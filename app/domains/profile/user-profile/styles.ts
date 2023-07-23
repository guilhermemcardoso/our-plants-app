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
  infoContainer: {
    flex: 1,
    marginLeft: dimens.margin.lg,
  },
  name: {
    marginBottom: dimens.margin.sm,
  },
  email: {
    marginBottom: dimens.margin.md,
  },
  mappedCount: {
    marginTop: dimens.margin.md,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: dimens.margin.lg,
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
