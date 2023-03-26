import { StyleSheet } from 'react-native';
import palette from '~/theme/palette';

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: palette.border,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
});

export default styles;
