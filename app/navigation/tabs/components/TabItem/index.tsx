import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

interface TabItemProps {
  focused: boolean;
  label?: string;
  iconName: string;
  onPress: () => void;
}

const TabItem = ({ focused, iconName, onPress }: TabItemProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {focused && <View bgColor="primary.pure" style={styles.activeBadge} />}
      <Icon
        name={iconName}
        size={30}
        color={focused ? theme.colors.primary.pure : theme.colors.font.disabled}
      />
    </TouchableOpacity>
  );
};

export default TabItem;
