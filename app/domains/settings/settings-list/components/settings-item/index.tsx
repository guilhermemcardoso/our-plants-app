import React, { ReactNode } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import Text from '~/shared/components/text';
import styles from './styles';

type Props = ViewProps & {
  title: string;
  onPress?: () => void;
  pressable?: boolean;
  RightComponent?: ReactNode;
};
const SettingsItem = ({
  title,
  pressable = false,
  onPress,
  RightComponent,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={!pressable}
      onPress={onPress}
      style={styles.container}
    >
      <Text>{title}</Text>
      {RightComponent}
    </TouchableOpacity>
  );
};

export default SettingsItem;
