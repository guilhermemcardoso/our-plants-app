import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, useTheme } from 'native-base';
import styles from './styles';

interface Props {
  onPress: () => void;
}

export default function DeleteBadge({ onPress }: Props) {
  const theme = useTheme();

  return (
    <Box style={styles.container} bgColor={theme.colors.primary.pure}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={'ios-close'} size={10} color={theme.colors.loading.text} />
      </TouchableOpacity>
    </Box>
  );
}
