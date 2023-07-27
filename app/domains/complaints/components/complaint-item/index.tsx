import React from 'react';
import { HStack, View, useTheme } from 'native-base';
import { Complaint } from '~/shared/types';
import { TouchableOpacity } from 'react-native';
import { Avatar, Text } from '~/shared/components';
import styles from './styles';

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
      <View bgColor={theme.colors.container.dark} style={styles.itemContainer}>
        <HStack>
          <Avatar type="plant" size="md" avatarUrl={data.plant_id.images[0]} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{data.description}</Text>
          </View>
        </HStack>
      </View>
    </TouchableOpacity>
  );
}
