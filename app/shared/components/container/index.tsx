import React, { useMemo } from 'react';
import { View } from 'native-base';
import { SafeAreaView, ViewProps } from 'react-native';
import { styles } from './styles';

type Props = ViewProps & {
  safe?: boolean;
};

export default function Container({
  children,
  style,
  safe = true,
  ...rest
}: Props) {
  const customStyle = useMemo(() => {
    if (style) {
      return [styles.default, style];
    }

    return styles.default;
  }, [style]);

  return (
    <View bgColor={'container.default'} style={customStyle} {...rest}>
      {safe ? (
        <SafeAreaView style={styles.safeContainer}>{children}</SafeAreaView>
      ) : (
        <View style={styles.safeContainer}>{children}</View>
      )}
    </View>
  );
}
