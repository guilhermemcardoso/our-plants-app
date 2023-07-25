import React from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import { View, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Plant } from '~/shared/types';
import Text from '../text';

type Props = ViewProps & {
  plant?: Plant;
  upvote: (plantId: string) => void;
  downvote: (plantId: string) => void;
};

export default function Votes({
  plant,
  style,
  downvote,
  upvote,
  ...rest
}: Props) {
  const theme = useTheme();

  const onUpvotePress = () => {
    if (plant) {
      upvote(plant?._id);
    }
  };
  const onDownvotePress = () => {
    if (plant) {
      downvote(plant?._id);
    }
  };

  if (!plant) {
    return null;
  }

  return (
    <View style={[styles.container, style]} {...rest}>
      <TouchableOpacity style={styles.votes} onPress={onUpvotePress}>
        <Icon
          name={'ios-caret-up-sharp'}
          size={30}
          color={theme.colors.font.success}
        />
      </TouchableOpacity>
      <Text size="label" variant="label">
        {plant.upvotes.length - plant.downvotes.length}
      </Text>
      <TouchableOpacity style={styles.votes} onPress={onDownvotePress}>
        <Icon
          name={'ios-caret-down-sharp'}
          size={30}
          color={theme.colors.font.error}
        />
      </TouchableOpacity>
    </View>
  );
}
