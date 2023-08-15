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
  evaluationLabel: {
    marginBottom: dimens.margin.md,
  },
  checkContainer: {
    marginTop: dimens.margin.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkLabel: {
    marginRight: dimens.margin.md,
  },
});

export default styles;
