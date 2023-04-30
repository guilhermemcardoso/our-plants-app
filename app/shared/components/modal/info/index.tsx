import React from 'react';
import { Modal, View } from 'native-base';
import { InterfaceModalProps } from 'native-base/lib/typescript/components/composites/Modal/types';
import { Button, Text } from '~/shared/components';
import styles from './styles';

type Props = InterfaceModalProps & {
  open: boolean;
  title: string;
  buttonLabel: string;
  onPress: () => void;
  children?: React.ReactNode;
};

const InfoModal = ({ open, title, buttonLabel, onPress, children }: Props) => {
  return (
    <Modal isOpen={open} onClose={onPress} safeAreaTop={true}>
      <Modal.Content bg="container.light" maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header bg="container.light" borderColor="divider.primary">
          <Text size="subtitle">{title}</Text>
        </Modal.Header>
        <Modal.Body bg="container.light">{children}</Modal.Body>
        <Modal.Footer bg="container.light" borderColor="divider.primary">
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              title={buttonLabel}
              onPress={onPress}
            />
          </View>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default InfoModal;
