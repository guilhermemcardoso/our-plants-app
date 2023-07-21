import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    width: '100%',
  },
  image: {
    borderRadius: 8,
    borderWidth: 1,
    height: 100,
    width: 100,
  },
  infoContainer: {
    marginLeft: 8,
    flex: 1,
  },
  description: {
    marginTop: 4,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  goButton: {
    borderRadius: 8,
    paddingLeft: 6,
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 6,
  },
  button: { alignSelf: 'stretch', marginHorizontal: 16 },
});

export default styles;
