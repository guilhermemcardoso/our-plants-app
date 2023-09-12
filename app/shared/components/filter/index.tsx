import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ListRenderItem, ViewProps } from 'react-native';
import { Actionsheet, Fab, FlatList, View, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, SearchBar, Text } from '~/shared/components';
import styles from './styles';
import { FilterOption } from '~/shared/types';

type Props = ViewProps & {
  selectedValues: FilterOption[];
  options: FilterOption[];
  isOpen?: boolean;
  show: boolean;
  showSearch?: boolean;
  isFab?: boolean;
  isLoading: boolean;
  onFilter: (options: FilterOption[]) => void;
  onClose: () => void;
  onOpen: () => void;
};

export default function Selector({
  selectedValues,
  options,
  show,
  isFab = true,
  showSearch = true,
  isLoading,
  onClose,
  onOpen,
  onFilter,
}: Props) {
  const theme = useTheme();
  const [filteredOptions, setFilteredOptions] =
    useState<FilterOption[]>(options);
  const [selectedOptions, setSelectedOptions] =
    useState<FilterOption[]>(selectedValues);
  const [searchText, setSearchText] = useState('');

  const selectedItemsLabel = useMemo(() => {
    if (selectedOptions.length === 0) {
      return 'Nenhum item selecionado';
    }

    if (selectedOptions.length === 1) {
      return '1 item selecionado';
    }
    return `${selectedOptions.length} itens selecionados`;
  }, [selectedOptions]);

  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const onSearch = () => {
    if (searchText.length === 0) {
      setFilteredOptions(options);
      return;
    }

    const filter = options.filter((option) =>
      option.value.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOptions(filter);
  };

  const onItemPress = (item: FilterOption) => {
    const isAlreadySelected =
      selectedOptions.filter((option) => option.key === item.key).length > 0;

    if (isAlreadySelected) {
      setSelectedOptions(
        selectedOptions.filter((option) => option.key !== item.key)
      );
      return;
    }

    setSelectedOptions([...selectedOptions, item]);
  };

  const onClearPress = () => {
    onFilter([]);
  };

  const onFilterPress = () => {
    onFilter(selectedOptions);
  };

  const onClosePress = () => {
    setSelectedOptions([]);
    onClose();
  };

  const onRenderItem: ListRenderItem<FilterOption> = ({
    item,
  }: {
    item: FilterOption;
  }) => {
    const startIcon =
      selectedOptions.filter((selectedValue) => {
        return selectedValue.key === item.key;
      }).length > 0
        ? 'ios-checkmark-circle'
        : 'ios-checkmark-circle-outline';

    return (
      <Actionsheet.Item
        onPress={() => onItemPress(item)}
        backgroundColor={theme.colors.container.light}
        startIcon={
          <Icon name={startIcon} size={20} color={theme.colors.font.primary} />
        }
        key={item.key}
      >
        <Text>{item.value}</Text>
      </Actionsheet.Item>
    );
  };

  useEffect(() => {
    setFilteredOptions(options);
    setSearchText('');
  }, [options]);

  useEffect(() => {
    if (show) {
      setSelectedOptions(selectedValues);
    }
  }, [selectedValues, show]);

  return (
    <>
      {selectedValues.length > 0 && (
        <View
          style={isFab ? styles.fabBadge : styles.badge}
          bgColor={theme.colors.white}
        />
      )}
      {isFab ? (
        <Fab
          onPress={onOpen}
          bgColor={theme.colors.primary.pure}
          renderInPortal={false}
          shadow={2}
          borderRadius={8}
          placement="top-right"
          size="sm"
          icon={
            isLoading ? (
              <ActivityIndicator size={20} color={theme.colors.loading.text} />
            ) : (
              <Icon
                name={'ios-filter'}
                size={20}
                color={theme.colors.loading.text}
              />
            )
          }
        />
      ) : (
        <Button
          style={styles.filterBtn}
          onPress={isLoading ? undefined : onOpen}
          bgColor={theme.colors.primary.pure}
          shadow={2}
          borderRadius={8}
          size="sm"
        >
          {isLoading ? (
            <ActivityIndicator size={16} color={theme.colors.loading.text} />
          ) : (
            <Icon
              name={'ios-filter'}
              size={16}
              color={theme.colors.loading.text}
            />
          )}
        </Button>
      )}

      <Actionsheet onClose={onClosePress} isOpen={show}>
        <Actionsheet.Content
          minHeight={showSearch ? 400 : 100}
          style={styles.mainContent}
          backgroundColor={theme.colors.container.light}
        >
          {showSearch && (
            <View style={styles.searchContainer}>
              <SearchBar
                searchText={searchText}
                onChangeSearchText={onChangeSearchText}
                onSearch={onSearch}
              />
              <Text variant="secondary" style={styles.selectedItemsLabel}>
                {selectedItemsLabel}
              </Text>
            </View>
          )}
          {filteredOptions.length === 0 && searchText.length > 0 && (
            <Text variant="secondary" size="label" style={styles.noResults}>
              Nenhum resultado foi encontrado para a busca
            </Text>
          )}
          <FlatList
            style={styles.list}
            data={filteredOptions}
            renderItem={onRenderItem}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              variant="outline"
              title="Limpar filtros"
              onPress={onClearPress}
            />
            <Button
              style={styles.button}
              title="Filtrar"
              onPress={onFilterPress}
            />
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
