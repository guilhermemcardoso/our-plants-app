import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';
import { TextFieldType } from './types';

interface TextFieldProps {
  placeholder?: string;
  onChange?: (text: string) => void;
  showErrors?: boolean;
  fieldType?: TextFieldType;
  required?: boolean;
}

const TextField = ({
  placeholder = '',
  onChange = () => {},
  showErrors = false,
  fieldType = TextFieldType.Text,
  required = false,
}: TextFieldProps) => {
  const [value, setValue] = useState('');

  const onChangeText = (text: string) => {
    setValue(text);
    onChange(text);
  };

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.field}
      />
    </View>
  );
};

export default TextField;
