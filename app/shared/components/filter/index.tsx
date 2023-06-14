import React, { useEffect, useMemo, useState } from 'react';
import { ListRenderItem, ViewProps } from 'react-native';
import { Actionsheet, Fab, FlatList, View, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, SearchBar, Text } from '~/shared/components';
import styles from './styles';
import { Specie } from '~/shared/types';

type Props = ViewProps & {
  selectedValues: Specie[];
  options: Specie[];
  isOpen?: boolean;
  show: boolean;
  onFilter: (options: Specie[]) => void;
  onClose: () => void;
  onOpen: () => void;
};

export default function Selector({
  selectedValues,
  options,
  show,
  onClose,
  onOpen,
  onFilter,
}: Props) {
  const theme = useTheme();
  const [filteredOptions, setFilteredOptions] = useState<Specie[]>(options);
  const [selectedOptions, setSelectedOptions] =
    useState<Specie[]>(selectedValues);
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
      option.popular_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOptions(filter);
  };

  const onItemPress = (item: Specie) => {
    const isAlreadySelected =
      selectedOptions.filter((option) => option._id === item._id).length > 0;
    if (isAlreadySelected) {
      setSelectedOptions(
        selectedOptions.filter((option) => option._id !== item._id)
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

  const onRenderItem: ListRenderItem<Specie> = ({ item }: { item: Specie }) => {
    return (
      <Actionsheet.Item
        onPress={() => onItemPress(item)}
        backgroundColor={theme.colors.container.light}
        startIcon={
          <Icon
            name={
              selectedOptions.filter(
                (selectedValue) => selectedValue._id === item._id
              ).length > 0
                ? 'ios-checkmark-circle'
                : 'ios-checkmark-circle-outline'
            }
            size={20}
            color={theme.colors.font.primary}
          />
        }
        key={item._id}
      >
        <Text>{item.popular_name}</Text>
      </Actionsheet.Item>
    );
  };

  useEffect(() => {
    setFilteredOptions(options);
    setSearchText('');
  }, [options]);

  useEffect(() => {
    setSelectedOptions(selectedValues);
  }, [selectedValues]);

  return (
    <>
      {selectedValues.length > 0 && (
        <View style={styles.badge} bgColor={theme.colors.white} />
      )}
      <Fab
        onPress={onOpen}
        bgColor={theme.colors.primary.pure}
        renderInPortal={false}
        shadow={2}
        borderRadius={8}
        placement="top-right"
        size="sm"
        icon={
          <Icon
            name={'ios-filter'}
            size={20}
            color={theme.colors.loading.text}
          />
        }
      />
      <Actionsheet onClose={onClosePress} isOpen={show}>
        <Actionsheet.Content
          style={styles.mainContent}
          backgroundColor={theme.colors.container.light}
        >
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
