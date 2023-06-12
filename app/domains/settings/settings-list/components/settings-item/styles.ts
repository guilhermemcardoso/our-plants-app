import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginLeft: 8,
  },
  slider: { flex: 1, marginRight: 16 },
  sliderValue: {
    minWidth: 50,
    textAlign: 'right',
  },
  sliderLabel: {
    marginBottom: 4,
  },
});

export default styles;
