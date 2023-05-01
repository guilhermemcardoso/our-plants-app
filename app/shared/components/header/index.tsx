import React, { ReactNode } from 'react';
import { SafeAreaView, ViewProps } from 'react-native';
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
  ...rest
}: Props) {
  return (
    <SafeAreaView style={styles.container} {...rest}>
      {LeftComponent}
      <Text style={styles.title} size="title">
        {title}
      </Text>
      {RightComponent}
    </SafeAreaView>
  );
}
