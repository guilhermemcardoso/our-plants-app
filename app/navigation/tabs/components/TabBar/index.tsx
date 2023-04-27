import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, useTheme } from 'native-base';
import { getIconName } from '../../utils';
import TabItem from '../TabItem';
import { styles } from './styles';

function TabBar({ state, navigation }: BottomTabBarProps) {
  const theme = useTheme();

  return (
    <View bgColor={theme.colors.container.light} style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const label = route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabItem
            key={route.name}
            onPress={onPress}
            focused={isFocused}
            label={label}
            iconName={getIconName(isFocused, label)}
          />
        );
      })}
    </View>
  );
}

export default TabBar;
