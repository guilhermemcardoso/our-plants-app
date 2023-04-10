import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },

  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

  title: {
    marginTop: 20,
  },
  subtitle: {
    marginTop: 20,
    textAlign: 'center',
  },
  textField: {
    marginTop: 10,
  },
  signUpButton: {
    marginTop: 36,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
