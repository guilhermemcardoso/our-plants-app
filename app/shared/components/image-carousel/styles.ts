import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
  },
  imageItemContainer: {
    marginHorizontal: dimens.margin.md,
    borderRadius: dimens.radius.sm,
    paddingVertical: dimens.padding.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: dimens.radius.sm,
    elevation: 1,
  },
  imageItem: {
    height: 78,
    width: 78,
    borderRadius: dimens.radius.sm,
    resizeMode: 'cover',
  },
});

export default styles;
