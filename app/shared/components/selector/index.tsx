import React, { useEffect, useState } from 'react';
import { ViewProps } from 'react-native';
import { FormControl, HStack, Select, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar, Text } from '~/shared/components';
import styles from './styles';

type Props = ViewProps & {
  value: string;
  options: string[];
  label: string;
  error?: string;
  isOpen?: boolean;
  placeholder?: string;
  createNewOptionLabel?: string;
  searchable?: boolean;
  show: boolean;
  onCreateNewOption?: () => void;
  onSelect: (option: string) => void;
  onClose: () => void;
  onOpen: () => void;
};

export default function Selector({
  value,
  label,
  options,
  error,
  accessibilityLabel = 'Selecione uma opção',
  placeholder = 'UF',
  style,
  createNewOptionLabel,
  searchable = false,
  show,
  onClose,
  onOpen,
  onCreateNewOption,
  onSelect,
}: Props) {
  const theme = useTheme();
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [searchText, setSearchText] = useState('');

  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const onSearch = () => {
    if (searchText.length === 0) {
      setFilteredOptions(options);
      return;
    }

    const filter = options.filter((option) =>
      option.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOptions(filter);
  };

  useEffect(() => {
    setFilteredOptions(options);
    setSearchText('');
  }, [options]);

  return (
    <FormControl style={style} isInvalid={!!error}>
      <FormControl.Label>{label}</FormControl.Label>
      <HStack>
        <Select
          onClose={onClose}
          onOpen={onOpen}
          p={3}
          flex={'1'}
          color="font.primary"
          backgroundColor={theme.colors.container.light}
          borderColor="container.dark"
          fontFamily={'body'}
          selectedValue={value}
          onValueChange={onSelect}
          placeholderTextColor={theme.colors.font.secondary}
          placeholder={placeholder}
          _actionSheet={{
            isOpen: show,
          }}
          _actionSheetBody={{
            ListFooterComponent: (
              <>
                {filteredOptions.length === 0 && (
                  <Text
                    variant="secondary"
                    size="label"
                    style={styles.noResults}
                  >
                    Nenhum resultado foi encontrado para a busca
                  </Text>
                )}
              </>
            ),
            ListHeaderComponent: (
              <>
                {searchable && (
                  <SearchBar
                    searchText={searchText}
                    onChangeSearchText={onChangeSearchText}
                    onSearch={onSearch}
                  />
                )}
              </>
            ),
          }}
          _actionSheetContent={{
            backgroundColor: theme.colors.container.light,
          }}
          _item={{
            _text: {
              color: theme.colors.font.primary,
            },
            bgColor: theme.colors.container.light,
          }}
          _selectedItem={{
            bg: theme.colors.primary.pure,
            borderRadius: 8,
            startIcon: (
              <Icon
                color={theme.colors.font.primary}
                name={'ios-checkmark-circle'}
                size={20}
              />
            ),
          }}
          accessibilityLabel={accessibilityLabel}
        >
          {createNewOptionLabel && onCreateNewOption && (
            <Select.Item
              opacity={0.5}
              onPress={onCreateNewOption}
              startIcon={
                <Icon
                  name={'ios-add'}
                  size={20}
                  color={theme.colors.font.primary}
                />
              }
              _text={{
                color: theme.colors.font.secondary,
              }}
              key={createNewOptionLabel}
              label={createNewOptionLabel}
              value={createNewOptionLabel}
            />
          )}
          {filteredOptions.map((option) => (
            <Select.Item
              startIcon={
                <Icon
                  name={'ios-checkmark-circle-outline'}
                  size={20}
                  color={theme.colors.font.primary}
                />
              }
              key={option}
              label={option}
              value={option}
            />
          ))}
        </Select>
      </HStack>
      <FormControl.ErrorMessage
        leftIcon={
          <Icon
            style={styles.iconError}
            name={'ios-alert-circle-outline'}
            size={16}
            color={theme.colors.font.error}
          />
        }
      >
        <Text size="helper" variant="error">
          {error}
        </Text>
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
