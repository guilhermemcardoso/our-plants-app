import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
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
  },
  textField: {
    marginTop: 10,
  },
  signInButton: {
    marginTop: 36,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
