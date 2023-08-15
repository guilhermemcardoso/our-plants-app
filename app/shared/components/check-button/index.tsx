import React from 'react';
import { ViewProps } from 'react-native';
import { useTheme, Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = ViewProps & {
  onPress: () => void;
  checked: boolean;
  size?: number;
};
const CheckButton = ({ size = 4, checked, onPress, style }: Props) => {
  const theme = useTheme();

  return (
    <Pressable
      style={style}
      onPress={onPress}
      backgroundColor={checked ? theme.colors.primary.pure : 'transparent'}
      borderColor={theme.colors.primary.pure}
      borderWidth={1}
      borderRadius={2}
      width={size}
      height={size}
    >
      {checked && (
        <Icon name="ios-checkmark" color={theme.colors.font.primary} />
      )}
    </Pressable>
  );
};

export default CheckButton;
