import { IconButton, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

type Props = {
  onPress: () => void;
  iconName?: string;
  size?: number;
};
const Alert = ({
  size = 20,
  iconName = 'ios-pencil-sharp',
  onPress,
}: Props) => {
  const theme = useTheme();

  return (
    <IconButton
      onPress={onPress}
      icon={
        <Icon name={iconName} size={size} color={theme.colors.font.primary} />
      }
      borderRadius="full"
      _hover={{
        bg: 'button.hover',
      }}
      _pressed={{
        bg: 'button.hover',
      }}
    />
  );
};

export default Alert;
