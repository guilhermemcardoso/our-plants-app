import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: dimens.margin.xl,
    right: dimens.margin.lg,
    left: dimens.margin.lg,
    borderRadius: dimens.radius.lg,
    paddingVertical: dimens.padding.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: dimens.radius.sm,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
