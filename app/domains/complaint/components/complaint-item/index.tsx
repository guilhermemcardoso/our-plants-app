import React from 'react';
import { HStack, Image, View, useTheme } from 'native-base';
import { Complaint } from '~/shared/types';
import { TouchableOpacity } from 'react-native';
import { Text } from '~/shared/components';
import styles from './styles';
import { formatDate } from '~/shared/utils/date';

interface Props {
  data: Complaint;
  onPress: (item: Complaint) => void;
}

export default function ComplaintItem({ data, onPress }: Props) {
  const theme = useTheme();

  const onItemPress = () => {
    onPress(data);
  };

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View
        opacity={data.closed ? 0.3 : 1}
        bgColor={theme.colors.container.dark}
        style={styles.itemContainer}
      >
        <HStack>
          <Image
            bgColor={theme.colors.container.light}
            alt={data.plant_id.specie_id.popular_name}
            style={styles.image}
            source={
              data.plant_id.images.length > 0
                ? {
                    uri: data.plant_id.images[0],
                  }
                : require('~/assets/images/default_plant.png')
            }
          />
          <View style={styles.infoContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {data.reason}
            </Text>
            <Text numberOfLines={1} style={styles.description}>
              {data.description}
            </Text>
            <Text size="helper" numberOfLines={1} style={styles.createdAt}>
              Criado em: {formatDate(data.created_at)}
            </Text>
          </View>
        </HStack>
      </View>
    </TouchableOpacity>
  );
}
