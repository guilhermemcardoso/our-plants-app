import React from 'react';
import { View } from 'native-base';
import Text from '~/shared/components/text';
import styles from './styles';

const AboutDescription = () => {
  return (
    <View>
      <Text style={styles.description}>
        O aplicativo Nossas Plantas foi desenvolvido pelo aluno Guilherme Muniz
        Cardoso, orientado pelo Prof. Dr. Rodrigo Bianchi.
      </Text>
      <Text style={styles.description}>
        O aplicativo tem como objetivo principal o mapeamento de árvores
        frutíferas e plantas alimentícias não convencionais.
      </Text>
      <Text style={styles.version}>Versão 1.0.0</Text>
    </View>
  );
};

export default AboutDescription;
