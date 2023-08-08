import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: dimens.radius.md,
    marginBottom: dimens.margin.sm,
    paddingLeft: dimens.padding.md,
    paddingVertical: dimens.padding.md,
    flex: 1,
  },
  infoContainer: {
    paddingLeft: dimens.padding.lg,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: dimens.margin.md,
    marginRight: dimens.margin.lg,
    flexWrap: 'wrap',
  },
  description: {
    marginRight: dimens.margin.lg,
    marginBottom: dimens.margin.sm,
    flexWrap: 'wrap',
  },
  createdAt: {
    marginRight: dimens.margin.lg,
    marginTop: dimens.margin.md,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
  image: {
    height: 86,
    width: 86,
    borderRadius: dimens.radius.md,
  },
});

export default styles;
