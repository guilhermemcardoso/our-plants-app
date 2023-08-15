import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  iconButton: {
    position: 'absolute',
    right: dimens.margin.sm,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  iconError: { alignSelf: 'flex-start' },
});

export default styles;
