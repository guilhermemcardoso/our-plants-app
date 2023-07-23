import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  iconButton: {
    position: 'absolute',
    right: dimens.margin.sm,
    backgroundColor: 'transparent',
  },
  iconError: { alignSelf: 'flex-start' },
  newItem: {
    color: 'font.secondary',
  },
  noResults: {
    padding: dimens.padding.lg,
    textAlign: 'center',
  },
});

export default styles;
