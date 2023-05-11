import React from 'react';
import { ViewProps } from 'react-native';
import { FormControl, HStack, Select, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../text';
import styles from './styles';

type Props = ViewProps & {
  value: string;
  options: string[];
  label: string;
  error?: string;
  placeholder?: string;
  createNewOptionLabel?: string;
  onCreateNewOption?: () => void;
  onSelect: (option: string) => void;
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
  onCreateNewOption,
  onSelect,
}: Props) {
  const theme = useTheme();

  return (
    <FormControl style={style} isInvalid={!!error}>
      <FormControl.Label>{label}</FormControl.Label>
      <HStack>
        <Select
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
          {options.map((option) => (
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
