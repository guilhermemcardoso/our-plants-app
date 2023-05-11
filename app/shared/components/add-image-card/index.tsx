import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, useTheme } from 'native-base';
import styles from './styles';

interface Props {
  onPress: () => void;
}

export default function AddImageCard({ onPress }: Props) {
  const theme = useTheme();
  return (
    <Box borderColor={theme.colors.font.secondary}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icon name={'ios-add'} size={30} color={theme.colors.font.secondary} />
      </TouchableOpacity>
    </Box>
  );
}
