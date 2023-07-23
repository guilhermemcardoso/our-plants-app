import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: dimens.radius.md,
    paddingLeft: dimens.padding.lg,
    marginBottom: dimens.margin.sm,
    paddingVertical: 12,
  },
  infoContainer: {
    paddingLeft: dimens.padding.lg,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: dimens.margin.md,
  },
});

export default styles;
