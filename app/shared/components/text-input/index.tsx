import React from 'react';
import {
  FormControl,
  HStack,
  IInputProps,
  Input as InputBase,
} from 'native-base';

type Props = IInputProps & {
  label?: string;
  error?: string;
  RightComponent?: any;
};

export default function TextInput({
  label,
  error,
  RightComponent,
  ...props
}: Props) {
  return (
    <FormControl isInvalid={!!error}>
      <FormControl.Label>{label}</FormControl.Label>
      <HStack>
        <InputBase {...props} flex="1" />
        {RightComponent || null}
      </HStack>
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
}
