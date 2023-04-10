import React, { useState } from 'react';
import {
  FormControl,
  HStack,
  IInputProps,
  IconButton,
  Input as InputBase,
  useTheme,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../text';
import styles from './styles';

type Props = IInputProps & {
  label?: string;
  error?: string;
  entryType?: 'text' | 'number' | 'email' | 'password' | 'search';
  onSearch?: () => void;
};

export default function TextInput({
  label,
  error,
  entryType = 'text',
  onSearch,
  style,
  ...props
}: Props) {
  const theme = useTheme();
  const [showContent, setShowContent] = useState(false);

  const onShowPassword = () => setShowContent(!showContent);

  const getAutoCapitalize = () => {
    if (entryType === 'text') {
      return 'sentences';
    }

    return 'none';
  };

  const getKeyboardType = () => {
    if (entryType === 'email') {
      return 'email-address';
    }

    if (entryType === 'number') {
      return 'numeric';
    }

    return 'default';
  };

  const getRightComponent = () => {
    if (['text', 'number', 'email'].includes(entryType)) {
      return null;
    }

    if (entryType === 'password') {
      return (
        <IconButton
          onPress={onShowPassword}
          variant="unstyled"
          _focus={{
            borderWidth: 0,
          }}
          style={{
            position: 'absolute',
            right: 4,
            backgroundColor: 'transparent',
          }}
          icon={
            <Icon
              name={!showContent ? 'ios-eye-outline' : 'ios-eye-off-outline'}
              size={20}
              color={theme.colors.font.primary}
            />
          }
        />
      );
    }

    return (
      <IconButton
        onPress={onSearch}
        variant="unstyled"
        _focus={{
          borderWidth: 0,
        }}
        style={styles.iconButton}
        icon={
          <Icon
            name={!showContent ? 'ios-eye-outline' : 'ios-eye-off-outline'}
            size={20}
            color={theme.colors.font.primary}
          />
        }
      />
    );
  };

  return (
    <FormControl style={style} isInvalid={!!error}>
      <FormControl.Label>{label}</FormControl.Label>
      <HStack>
        <InputBase
          _focus={{
            borderColor: 'primary.dark',
            _ios: {
              selectionColor: 'primary.dark',
            },
            _android: {
              selectionColor: 'primary.dark',
            },
          }}
          color="font.primary"
          backgroundColor="container.light"
          borderColor="container.dark"
          fontFamily={'body'}
          keyboardType={getKeyboardType()}
          autoCapitalize={getAutoCapitalize()}
          pr={entryType === 'password' ? '16' : null}
          secureTextEntry={!showContent}
          p={3}
          {...props}
          flex={'1'}
        />
        {getRightComponent()}
      </HStack>
      <FormControl.ErrorMessage
        leftIcon={
          <Icon
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
