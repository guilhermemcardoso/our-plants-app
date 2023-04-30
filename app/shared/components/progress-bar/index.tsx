import { Box, Progress } from 'native-base';
import React, { useMemo } from 'react';
import { ViewProps } from 'react-native';
import styles from './styles';
import { Text } from '~/shared/components';

type Props = ViewProps & {
  totalXp: number;
  currentXp: number;
};

const ProgressBar = ({ totalXp, currentXp, ...props }: Props) => {
  const xp = useMemo(() => {
    return (currentXp * 100) / totalXp;
  }, [currentXp, totalXp]);

  return (
    <Box w="100%" {...props}>
      <Progress
        bg="progress.background"
        _filledTrack={{
          bg: 'progress.track',
        }}
        value={xp}
        size="xl"
      />
      <Box w="100%" style={styles.xpContainer}>
        <Text
          variant="progress"
          style={styles.xp}
        >{`${currentXp}/${totalXp}`}</Text>
      </Box>
    </Box>
  );
};

export default ProgressBar;
