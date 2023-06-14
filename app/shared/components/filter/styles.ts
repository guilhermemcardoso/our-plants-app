import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContent: {
    minHeight: 400,
  },
  badge: {
    zIndex: 9999,
    position: 'absolute',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 12,
    width: 12,
    right: 20,
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 1,
  },
  list: { width: '100%' },
  searchContainer: { width: '100%', marginBottom: 10 },
  selectedItemsLabel: {
    marginTop: 12,
    marginHorizontal: 12,
    textAlign: 'right',
  },
  noResults: {
    padding: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    flex: 1,
    margin: 4,
  },
});

export default styles;
