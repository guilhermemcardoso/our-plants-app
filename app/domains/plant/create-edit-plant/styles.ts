import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  mapLabel: {
    marginTop: dimens.margin.xl,
  },
  mapContainer: {
    height: 240,
    marginTop: dimens.margin.md,
    marginBottom: dimens.margin.lg,
  },
  map: {
    borderRadius: dimens.radius.md,
  },
  sectionLabel: {
    marginBottom: dimens.margin.md,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  createEditButton: {
    marginTop: dimens.margin.lg,
    marginBottom: dimens.margin.xl,
  },
  infoContainer: {
    padding: dimens.padding.lg,
    borderRadius: dimens.radius.md,
    marginTop: dimens.margin.lg,
  },
  specieSelector: {
    marginTop: dimens.margin.lg,
  },
  fieldLabel: {
    marginBottom: dimens.margin.sm,
    fontWeight: 'bold',
  },
  imageCarousel: {
    marginTop: dimens.margin.lg,
  },
});

export default styles;
