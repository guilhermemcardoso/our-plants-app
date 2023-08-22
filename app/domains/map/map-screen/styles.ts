import { Platform, StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? dimens.margin.md : dimens.margin.lg,
    marginBottom: Platform.OS === 'ios' ? 68 : 88,
  },
  map: {
    borderRadius: dimens.radius.md,
  },
  recenterBtn: {
    position: 'absolute',
    bottom: 88,
    right: dimens.margin.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 1,
  },
});

export default styles;
