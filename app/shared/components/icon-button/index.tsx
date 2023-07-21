import { IconButton as NativeIconButton, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { ViewProps } from 'react-native';

type Props = ViewProps & {
  onPress: () => void;
  iconName?: string;
  iconColor?: string;
  backgroundColor?: string;
  size?: number;
};
const IconButton = ({
  size = 20,
  iconName = 'ios-pencil-sharp',
  iconColor,
  backgroundColor,
  onPress,
  style,
}: Props) => {
  const theme = useTheme();

  return (
    <NativeIconButton
      style={style}
      onPress={onPress}
      backgroundColor={backgroundColor}
      icon={
        <Icon
          name={iconName}
          size={size}
          color={iconColor ? iconColor : theme.colors.font.primary}
        />
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

export default IconButton;
