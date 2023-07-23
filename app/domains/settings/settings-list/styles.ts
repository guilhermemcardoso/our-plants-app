import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  title: {
    paddingVertical: dimens.padding.md,
  },
  listContainer: {
    paddingRight: dimens.padding.lg,
    paddingLeft: dimens.padding.md,
    paddingVertical: dimens.padding.lg,
    borderRadius: dimens.radius.md,
    marginTop: dimens.margin.lg,
  },
});

export default styles;
