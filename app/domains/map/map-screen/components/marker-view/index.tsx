import React from 'react';
import { Platform } from 'react-native';
import MarkerViewAndroid from './index.android';
import MarkerViewIos from './index.ios';
import { MarkerProps } from './types';

export default function MarkerView(props: MarkerProps) {
  return Platform.OS === 'ios' ? (
    <MarkerViewIos {...props} />
  ) : (
    <MarkerViewAndroid {...props} />
  );
}
