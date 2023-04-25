import { View } from 'native-base';
import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import Text from '~/shared/components/text';
import styles from './styles';

type Props = ViewProps & {
  title: string;
  RightComponent?: ReactNode;
  LeftComponent?: ReactNode;
};

export default function Header({
  title,
  RightComponent,
  LeftComponent,
}: Props) {
  return (
    <View style={styles.container}>
      {LeftComponent}
      <Text style={styles.title} size="title">
        {title}
      </Text>
      {RightComponent}
    </View>
  );
}
