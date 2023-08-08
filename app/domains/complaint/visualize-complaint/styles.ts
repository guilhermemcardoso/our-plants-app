import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  mainContainer: { padding: 0 },
  headerContainer: {
    paddingHorizontal: dimens.padding.lg,
  },
  sectionLabel: {
    marginBottom: dimens.margin.lg,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    margin: dimens.margin.lg,
    marginBottom: dimens.margin.xl,
  },
  infoContainer: {
    padding: dimens.padding.lg,
    margin: dimens.margin.lg,
    marginTop: 0,
    borderRadius: dimens.radius.md,
  },
  label: {
    marginBottom: dimens.margin.lg,
    fontWeight: 'bold',
  },
  content: {
    fontWeight: 'normal',
    marginRight: dimens.margin.lg,
    flex: 1,
  },
  mapContainer: {
    height: 240,
    marginBottom: dimens.margin.lg,
  },
  map: {
    borderRadius: dimens.radius.md,
  },
});

export default styles;
