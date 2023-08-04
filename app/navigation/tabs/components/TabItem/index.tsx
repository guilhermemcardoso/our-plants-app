import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { useComplaintsStore } from '~/store/complaints-store';
import { Tabs } from '../../constants';

interface TabItemProps {
  focused: boolean;
  label: string;
  iconName: string;
  onPress: () => void;
}

const TabItem = ({ focused, iconName, label, onPress }: TabItemProps) => {
  const theme = useTheme();
  const complaints = useComplaintsStore((state) => state.complaints);
  const openedComplaints = complaints.filter((complaint) => !complaint.closed);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {focused && <View bgColor="primary.pure" style={styles.activeBadge} />}
      <Icon
        name={iconName}
        size={30}
        color={focused ? theme.colors.primary.pure : theme.colors.font.disabled}
      />
      {openedComplaints.length > 0 && label === Tabs.COMPLAINTS ? (
        <View
          borderWidth={1}
          borderColor="container.light"
          bgColor="font.error"
          style={styles.notificationBadge}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default TabItem;
