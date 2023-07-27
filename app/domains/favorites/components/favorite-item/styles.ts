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
    flex: 1,
  },
  infoContainer: {
    paddingLeft: dimens.padding.lg,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: dimens.margin.md,
    marginRight: dimens.margin.md,
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default styles;
