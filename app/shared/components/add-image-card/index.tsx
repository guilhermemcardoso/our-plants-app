import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { Box, useTheme } from 'native-base';
import styles from './styles';

interface Props {
  onPress: () => void;
}

export default function AddImageCard({ onPress }: Props) {
  const theme = useTheme();
  return (
    <Box borderColor={theme.colors.font.secondary} style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={'ios-add'} size={30} color={theme.colors.font.secondary} />
      </TouchableOpacity>
    </Box>
  );
}
