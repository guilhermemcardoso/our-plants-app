import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 8 : 16,
    marginBottom: Platform.OS === 'ios' ? 68 : 88,
  },
  map: {
    borderRadius: 8,
  },
});

export default styles;
