import React from 'react';
import { Container } from '~/shared/components';
import { View } from 'native-base';
import styles from './styles';

const VisualizePlant = () => {
  return (
    <Container>
      <View style={styles.mapContainer}></View>
    </Container>
  );
};

export default VisualizePlant;
