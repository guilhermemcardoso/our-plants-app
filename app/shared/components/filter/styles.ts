import { StyleSheet } from 'react-native';
import { dimens } from '~/theme/dimens';

const styles = StyleSheet.create({
  mainContent: {},
  badge: {
    zIndex: 9999,
    position: 'absolute',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    width: 10,
    right: 4,
    top: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 1,
  },
  fabBadge: {
    zIndex: 9999,
    position: 'absolute',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 12,
    width: 12,
    right: 20,
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 1,
  },
  list: { width: '100%' },
  searchContainer: { width: '100%', marginBottom: dimens.margin.md },
  selectedItemsLabel: {
    marginTop: dimens.margin.md,
    marginHorizontal: dimens.margin.md,
    textAlign: 'right',
  },
  noResults: {
    padding: dimens.padding.lg,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    flex: 1,
    margin: dimens.margin.sm,
  },
  filterBtn: {
    paddingVertical: dimens.padding.lg,
    height: 40,
    width: 40,
  },
});

export default styles;
