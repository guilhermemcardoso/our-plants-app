import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  mainContainer: { padding: 0 },
  headerContainer: {
    paddingHorizontal: dimens.padding.lg,
  },
  infoContainer: {
    paddingHorizontal: dimens.padding.lg,
    padding: dimens.padding.lg,
    borderRadius: dimens.radius.lg,
    margin: dimens.margin.lg,
  },
  mapContainer: {
    height: 240,
    marginTop: dimens.margin.md,
    marginBottom: dimens.margin.lg,
  },
  map: {
    borderRadius: dimens.radius.md,
  },
  label: {
    marginBottom: dimens.margin.sm,
  },
  specieContainer: {
    flexDirection: 'row',
    marginBottom: dimens.margin.sm,
  },
  specie: {
    marginLeft: dimens.margin.sm,
  },
  authorContainer: {
    flexDirection: 'row',
    marginBottom: dimens.margin.sm,
  },
  author: {
    marginLeft: dimens.margin.sm,
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginBottom: dimens.margin.sm,
  },
  description: {
    marginLeft: dimens.margin.sm,
  },
  voteContainer: {
    marginBottom: dimens.margin.lg,
    marginRight: dimens.margin.lg,
  },
  italic: { fontStyle: 'italic' },
});

export default styles;
