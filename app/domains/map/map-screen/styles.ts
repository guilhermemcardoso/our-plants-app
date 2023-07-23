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
});

export default styles;
