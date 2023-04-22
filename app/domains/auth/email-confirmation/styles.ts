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
  message: {
    marginTop: 20,
    textAlign: 'center',
  },
  note: {
    marginTop: 10,
    marginBottom: 36,
    textAlign: 'center',
  },
  resendButton: {
    marginTop: 10,
  },
  goBackContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
