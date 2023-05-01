import { IconButton, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { ViewProps } from 'react-native';

type Props = ViewProps & {
  onPress: () => void;
  iconName?: string;
  size?: number;
};
const Alert = ({
  size = 20,
  iconName = 'ios-pencil-sharp',
  onPress,
  style,
}: Props) => {
  const theme = useTheme();

  return (
    <IconButton
      style={style}
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
