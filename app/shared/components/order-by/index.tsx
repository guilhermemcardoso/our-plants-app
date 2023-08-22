import React from 'react';
import { Platform, ViewProps } from 'react-native';
import { HStack, Select, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { dimens } from '~/theme/dimens';

type Props = ViewProps & {
  options: string[];
  selectedOption: string;
  show: boolean;
  onSelect: (option: string) => void;
  onClose: () => void;
  onOpen: () => void;
};

export default function OrderBy({
  options,
  selectedOption,
  style,
  show,
  onClose,
  onOpen,
  onSelect,
}: Props) {
  const theme = useTheme();

  return (
    <HStack style={style}>
      <Select
        onClose={onClose}
        onOpen={onOpen}
        px={3}
        py={Platform.OS === 'ios' ? 3 : 1}
        flex={'1'}
        color="font.primary"
        backgroundColor={theme.colors.container.light}
        borderColor="container.dark"
        fontFamily={'body'}
        selectedValue={selectedOption}
        onValueChange={onSelect}
        placeholderTextColor={theme.colors.font.secondary}
        _actionSheet={{
          isOpen: show,
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
          borderRadius: dimens.radius.md,
          startIcon: (
            <Icon
              color={theme.colors.font.primary}
              name={'ios-checkmark-circle'}
              size={20}
            />
          ),
        }}
        accessibilityLabel={'Ordenar lista por'}
      >
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
  );
}
