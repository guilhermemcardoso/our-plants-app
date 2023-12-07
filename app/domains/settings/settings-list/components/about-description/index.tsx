import React from 'react';
import { View } from 'native-base';
import Text from '~/shared/components/text';
import styles from './styles';
import { APP_VERSION } from '@env';
const AboutDescription = () => {
  return (
    <View>
      <Text style={styles.description}>
        O aplicativo Nossas Plantas foi desenvolvido pelo aluno do Curso de
        Especialização em Desenvolvimento de Sistemas para Dispositivos Móveis
        Guilherme Muniz Cardoso, orientado pelo Prof. Dr. Rodrigo Bianchi.
      </Text>
      <Text style={styles.description}>
        O aplicativo tem como objetivo principal o mapeamento de árvores
        frutíferas e plantas alimentícias não convencionais, e foi inspirado
        principalmente no mapa compartilhado "Pés de Frutas - São Carlos".
      </Text>
      <Text>
        Além do orientador Prof. Dr. Rodrigo Bianchi, o projeto contou com o
        apoio de dois dos idealizadores do mapa, Rafael Moura e Achiles
        Siqueira.
      </Text>
      <Text style={styles.version}>Versão {APP_VERSION}</Text>
    </View>
  );
};

export default AboutDescription;
