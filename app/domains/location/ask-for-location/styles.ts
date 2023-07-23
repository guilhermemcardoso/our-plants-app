import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: dimens.margin.md,
  },
  subtitle: {
    marginTop: dimens.margin.lg,
    textAlign: 'center',
  },
  title: {
    marginTop: dimens.margin.xl,
  },
  description: {
    margin: dimens.margin.lg,
    textAlign: 'center',
  },
  button: {
    marginTop: dimens.margin.xl,
    alignSelf: 'stretch',
  },
});
