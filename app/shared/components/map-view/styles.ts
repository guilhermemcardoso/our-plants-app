import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

export const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    borderRadius: dimens.radius.md,
    overflow: 'hidden',
  },
});
