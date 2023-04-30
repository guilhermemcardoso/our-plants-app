import { Box, Avatar as NativeAvatar, View } from 'native-base';
import React from 'react';
import { ViewProps } from 'react-native';
import Text from '../text';
import styles from './styles';

type Props = ViewProps & {
  level?: number;
  avatarUrl: string | undefined;
};

const Avatar = ({ level, avatarUrl, ...rest }: Props) => {
  return (
    <Box {...rest}>
      <NativeAvatar
        style={styles.avatar}
        bg="container.light"
        size="xl"
        source={
          avatarUrl
            ? {
                uri: avatarUrl,
              }
            : require('~/assets/images/default_profile.png')
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
