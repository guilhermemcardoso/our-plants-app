import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  iconButton: {
    position: 'absolute',
    right: 4,
    backgroundColor: 'transparent',
  },
  iconError: { alignSelf: 'flex-start' },
  newItem: {
    color: 'font.secondary',
  },
  noResults: {
    padding: 16,
    textAlign: 'center',
  },
});

export default styles;
