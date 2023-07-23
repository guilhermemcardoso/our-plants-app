import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: dimens.padding.lg,
    marginLeft: dimens.margin.md,
  },
  slider: { flex: 1, marginRight: dimens.margin.lg },
  sliderValue: {
    minWidth: 50,
    textAlign: 'right',
  },
  sliderLabel: {
    marginBottom: dimens.margin.sm,
  },
});

export default styles;
