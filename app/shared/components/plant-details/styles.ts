import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: dimens.padding.lg,
    width: '100%',
  },
  image: {
    marginLeft: dimens.margin.lg,
    borderRadius: dimens.radius.md,
    borderWidth: 1,
    height: 100,
    width: 100,
  },
  infoContainer: {
    marginLeft: dimens.margin.md,
    flex: 1,
  },
  description: {
    marginTop: dimens.margin.sm,
    marginBottom: dimens.margin.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goButton: {
    borderRadius: dimens.radius.md,
    paddingLeft: dimens.padding.md,
    paddingTop: dimens.padding.md,
    paddingRight: dimens.padding.md,
    paddingBottom: dimens.padding.md,
  },
  button: { alignSelf: 'stretch', marginHorizontal: dimens.margin.lg },
});

export default styles;
