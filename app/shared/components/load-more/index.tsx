import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '~/shared/components';
import { styles } from './styles';

interface Props {
  onPress: () => void;
  label?: string;
}

export default function LoadMore({ onPress, label = 'Carregar mais' }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
