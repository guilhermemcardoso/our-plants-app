import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  buttonContainer: {
    padding: dimens.padding.lg,
    flexDirection: 'row',
  },
  button: {
    marginVertical: dimens.padding.lg,
    marginHorizontal: dimens.padding.xl,
    alignItems: 'center',
  },
});

export default styles;
