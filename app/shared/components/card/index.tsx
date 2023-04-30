import React, { useMemo } from 'react';
import { View } from 'native-base';
import { ViewProps } from 'react-native';
import { styles } from './styles';

export default function Card({ children, style, ...rest }: ViewProps) {
  const customStyle = useMemo(() => {
    if (style) {
      return [styles.default, style];
    }

    return styles.default;
  }, [style]);

  return (
    <View bgColor={'container.light'} style={customStyle} {...rest}>
      <View style={styles.container}>{children}</View>
    </View>
  );
}
