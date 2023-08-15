import React from 'react';
import {
  FormControl,
  HStack,
  ITextAreaProps,
  TextArea as TextAreaBase,
  useTheme,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../text';
import styles from './styles';
import { Platform } from 'react-native';

type Props = ITextAreaProps & {
  label?: string;
  error?: string;
};

export default function TextArea({ label, error, style, ...props }: Props) {
  const theme = useTheme();

  return (
    <FormControl style={style} isInvalid={!!error}>
      <FormControl.Label>{label}</FormControl.Label>
      <HStack>
        <TextAreaBase
          _focus={{
            borderColor: 'primary.dark',
            _ios: {
              selectionColor: 'primary.dark',
            },
            _android: {
              selectionColor: 'primary.dark',
            },
          }}
          autoCompleteType={'sentences'}
          color="font.primary"
          backgroundColor="container.light"
          borderColor="container.dark"
          fontFamily={'body'}
          py={Platform.OS === 'ios' ? 3 : 1}
          px={3}
          {...props}
          flex={'1'}
        />
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
