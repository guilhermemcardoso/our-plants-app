import { View, useTheme } from 'native-base';
import React from 'react';
import TextInput from '../text-input';
import styles from './styles';
import Button from '../button';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  searchText: string;
  onSearch: () => void;
  onChangeSearchText: (searchText: string) => void;
}

export default function SearchBar({
  searchText,
  onSearch,
  onChangeSearchText,
}: Props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSearchText}
        value={searchText}
        placeholder="Busca"
        RightComponent={
          <Button style={styles.button} onPress={onSearch}>
            <Icon
              name={'ios-search'}
              size={20}
              color={theme.colors.loading.text}
            />
          </Button>
        }
      />
    </View>
  );
}
