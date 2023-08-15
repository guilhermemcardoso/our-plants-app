import { Platform, StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? dimens.margin.md : dimens.margin.lg,
    marginBottom: Platform.OS === 'ios' ? 68 : 88,
  },
  closedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: dimens.padding.lg,
  },
});

export default styles;
