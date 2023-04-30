import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    marginBottom: 8,
  },
  mappedCount: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 16,
  },
  infoCard: {
    marginTop: 16,
  },
  profileContainer: {
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  fieldLabel: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
});

export default styles;
