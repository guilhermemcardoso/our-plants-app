import React from 'react';
import { View, useTheme } from 'native-base';
import { TouchableOpacity, ViewProps } from 'react-native';
import { styles } from './styles';

type Props = ViewProps & {
  total: number;
  current: number;
  onDotPress: (index: number) => void;
};

export default function Dots({
  total,
  current,
  style,
  onDotPress,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]} {...rest}>
      {new Array(total).fill(0).map((_, index) => {
        const onPress = () => {
          onDotPress(index);
        };

        return (
          <TouchableOpacity onPress={onPress}>
            <View
              bgColor={
                index === current
                  ? theme.colors.primary.pure
                  : theme.colors.font.label
              }
              style={styles.dot}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
