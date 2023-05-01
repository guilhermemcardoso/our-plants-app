import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
  },
  removePictureButton: {
    marginTop: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  sectionLabel: {
    marginBottom: 10,
    textAlign: 'center',
  },
  mappedCount: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  leftInput: {
    flex: 1,
  },
  rightInput: {
    flex: 0.4,
    marginLeft: 8,
  },
  editButton: {
    marginTop: 16,
    marginBottom: 30,
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
