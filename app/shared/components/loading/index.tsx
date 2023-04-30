import React, { useCallback, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { View, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const spinValue = new Animated.Value(0);

interface Props {
  show?: boolean;
}

const Loading = ({ show }: Props) => {
  const theme = useTheme();

  const runSpinAnimation = useCallback(() => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => runSpinAnimation());
  }, []);

  useEffect(() => {
    runSpinAnimation();
  }, [runSpinAnimation]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!show) {
    return null;
  }

  return (
    <View bgColor="loading.background" style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Icon
          name={'ios-refresh'}
          size={56}
          color={theme.colors.loading.text}
        />
      </Animated.View>
    </View>
  );
};

export default Loading;
