import React, { useMemo } from 'react';
import { View } from 'native-base';
import { SafeAreaView, ViewProps } from 'react-native';
import { styles } from './styles';

export default function Container({ children, style, ...rest }: ViewProps) {
  const customStyle = useMemo(() => {
    if (style) {
      return [styles.default, style];
    }

    return styles.default;
  }, [style]);

  return (
    <View bgColor={'container.default'} style={customStyle} {...rest}>
      <SafeAreaView style={styles.safeContainer}>{children}</SafeAreaView>
    </View>
  );
}
