import React from 'react';
import { View, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from '~/shared/components';
import styles from './styles';

export default function EmptyList() {
  const theme = useTheme();

  return (
    <View bgColor={theme.colors.container.dark} style={styles.container}>
      <Text variant="secondary" style={styles.title} size="subtitle">
        Lista vazia
      </Text>
      <Text style={styles.description}>
        Não existem denúncias/reclamações em aberto para serem avaliadas. Para
        criar uma nova denúncia/reclamação, basta clicar no ícone{' '}
        <Icon
          name={'ios-alert-circle-outline'}
          size={20}
          color={theme.colors.font.primary}
        />
        . O ícone pode ser encontrado sempre que um item for selecionado para
        visualização.
      </Text>
    </View>
  );
}
