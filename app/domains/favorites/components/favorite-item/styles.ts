import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 4,
    paddingVertical: 12,
  },
  infoContainer: {
    paddingLeft: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default styles;
