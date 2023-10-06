import {
  Box,
  HStack,
  IconButton,
  Alert as NativeAlert,
  VStack,
  useTheme,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import Text from '../text';
import { InterfaceAlertProps } from 'native-base/lib/typescript/components/composites/Alert/types';
import styles from './styles';
import { useAlert } from '~/hooks/use-alert';

type Props = InterfaceAlertProps & {
  show?: boolean;
  title: string;
  description?: string;
};
const Alert = ({ show, status, title, description }: Props) => {
  const theme = useTheme();
  const { closeAlert } = useAlert();

  if (!show) {
    return null;
  }

  return (
    <NativeAlert
      style={styles.container}
      status={status}
      bg={`alert.${status}`}
    >
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack flexShrink={1} space={2} alignItems="center">
            <Icon
              name={'ios-alert-circle-outline'}
              size={20}
              color={theme.colors.font.primary}
            />
            <Text>{title}</Text>
          </HStack>
          <IconButton
            onPress={closeAlert}
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={
              <Icon
                name={'ios-close-outline'}
                size={20}
                color={theme.colors.font.primary}
              />
            }
          />
        </HStack>
        {!!description && description.length > 0 && (
          <Box pl="3">
            <Text>{description}</Text>
          </Box>
        )}
      </VStack>
    </NativeAlert>
  );
};

export default Alert;
