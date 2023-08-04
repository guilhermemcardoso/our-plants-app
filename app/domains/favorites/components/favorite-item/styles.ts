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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: dimens.padding.lg,
    flex: 1,
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginRight: dimens.margin.md,
    marginBottom: dimens.margin.sm,
    flexWrap: 'wrap',
  },
  description: {
    marginRight: dimens.margin.md,
    marginBottom: dimens.margin.sm,
    flexWrap: 'wrap',
  },
  image: {
    height: 72,
    width: 72,
    borderRadius: dimens.radius.md,
  },
});

export default styles;
