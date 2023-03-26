import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { getIconColor } from './utils';

interface TabItemProps {
  focused: boolean;
  label?: string;
  iconName: string;
  onPress: () => void;
}

const TabItem = ({ focused, iconName, onPress }: TabItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={iconName} size={30} color={getIconColor(focused)} />
    </TouchableOpacity>
  );
};

export default TabItem;
