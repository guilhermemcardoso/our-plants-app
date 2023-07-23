import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  description: {
    marginBottom: dimens.margin.md,
    textAlign: 'center',
  },
  version: {
    textAlign: 'center',
    marginTop: dimens.margin.md,
    fontWeight: 'bold',
  },
});

export default styles;
