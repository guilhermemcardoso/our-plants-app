import React from 'react';
import { View, useTheme } from 'native-base';
import { Plant } from '~/shared/types';
import { TouchableOpacity } from 'react-native';
import { Avatar, IconButton, Text } from '~/shared/components';
import { formatDistance } from '~/shared/utils/distance';
import styles from './styles';

interface Props {
  data: Plant;
  distance: number | null;
  onPress: (item: Plant) => void;
  onFavorite: (item: Plant) => void;
}

export default function FavoriteItem({
  data,
  distance,
  onFavorite,
  onPress,
}: Props) {
  const theme = useTheme();

  const onFavoritePress = () => {
    onFavorite(data);
  };

  const onItemPress = () => {
    onPress(data);
  };

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View bgColor={theme.colors.container.dark} style={styles.itemContainer}>
        <Avatar type="plant" size="md" avatarUrl={data.images[0]} />
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {data.description}
          </Text>
          <Text size="helper">{`Distância: ${
            distance !== null ? formatDistance(distance) : '---'
          }`}</Text>
        </View>
        <IconButton size={20} iconName="ios-heart" onPress={onFavoritePress} />
      </View>
    </TouchableOpacity>
  );
}
