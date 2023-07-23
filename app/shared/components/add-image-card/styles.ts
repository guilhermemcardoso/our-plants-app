import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  container: {
    height: 78,
    width: 78,
    marginHorizontal: dimens.margin.md,
    borderRadius: dimens.radius.sm,
    borderStyle: 'dashed',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
