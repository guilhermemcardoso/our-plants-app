import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
  },
  imageItemContainer: {
    marginHorizontal: 8,
    borderRadius: 4,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  imageItem: {
    height: 78,
    width: 78,
    borderRadius: 4,
    resizeMode: 'center',
  },
});

export default styles;
