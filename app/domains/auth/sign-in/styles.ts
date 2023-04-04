import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

export const styles = StyleSheet.create({
  container: {
    margin: dimens.padding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  safeContainer: {},
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 100,
    height: 100,
  },

  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter',
    lineHeight: 28,
  },
});
