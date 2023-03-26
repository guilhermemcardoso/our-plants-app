import React, { useMemo } from 'react';
import { Text as NativeText, TextStyle } from 'react-native';

interface TextProps {
  size?: TextSize;
  style?: TextStyle;
  variant?: TextVariant;
  weight?: TextWeight;
}

const Text = ({
  size = 'content',
  style,
  variant = 'primary',
  weight = 'regular',
}: TextProps) => {
  const customStyle = useMemo(
    () => [
      getSizeStyle(size),
      getVariantStyle(variant),
      getWeightStyle(weight),
      style,
    ],
    [size, variant, weight]
  );

  return <NativeText style={customStyle}></NativeText>;
};

export default Text;
