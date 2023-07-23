import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  button: {
    flex: 1,
    marginHorizontal: dimens.margin.sm,
  },
  textField: {
    marginTop: dimens.margin.md,
  },
});

export default styles;
