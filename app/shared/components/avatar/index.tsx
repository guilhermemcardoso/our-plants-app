import { Box, Avatar as NativeAvatar, View } from 'native-base';
import React from 'react';
import { ViewProps } from 'react-native';
import Text from '../text';
import styles from './styles';

type Props = ViewProps & {
  level?: number;
  avatarUrl: string | undefined;
  type?: 'plant' | 'user';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
};

const defaultImages = {
  user: require('~/assets/images/default_profile.png'),
  plant: require('~/assets/images/default_plant.png'),
};

const Avatar = ({
  level,
  avatarUrl,
  type = 'user',
  size = 'xl',
  ...rest
}: Props) => {
  return (
    <Box {...rest}>
      <NativeAvatar
        style={styles.avatar}
        bg="container.light"
        size={size}
        source={
          avatarUrl
            ? {
                uri: avatarUrl,
              }
            : defaultImages[type]
        }
      />
      {level && (
        <View bgColor="primary.pure" style={styles.levelContainer}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      )}
    </Box>
  );
};

export default Avatar;
