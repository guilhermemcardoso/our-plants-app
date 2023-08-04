import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeBadge: {
    width: 8,
    height: 8,
    borderRadius: dimens.radius.sm,
    position: 'absolute',
    top: -20,
  },
  notificationBadge: {
    width: 10,
    height: 10,
    borderRadius: dimens.radius.sm,
    position: 'absolute',
    top: 0,
    right: 2,
  },
});
