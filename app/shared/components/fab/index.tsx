import React from 'react';
import { Fab as NativeFab, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onPress: () => void;
}

export default function Fab({ onPress }: Props) {
  const theme = useTheme();

  return (
    <NativeFab
      onPress={onPress}
      bgColor={theme.colors.primary.pure}
      renderInPortal={false}
      shadow={2}
      size="sm"
      icon={
        <Icon name={'ios-add'} size={20} color={theme.colors.loading.text} />
      }
    />
  );
}
