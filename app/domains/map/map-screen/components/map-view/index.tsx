import React from 'react';
import { Platform } from 'react-native';
import MapViewAndroid from './index.android';
import MapViewIos from './index.ios';
import { MapProps } from './types';

export default function MapView(props: MapProps) {
  return Platform.OS === 'ios' ? (
    <MapViewIos {...props} />
  ) : (
    <MapViewAndroid {...props} />
  );
}
