import React from 'react';
import { Modal, View } from 'native-base';
import { InterfaceModalProps } from 'native-base/lib/typescript/components/composites/Modal/types';
import { Button, Text } from '~/shared/components';
import styles from './styles';

type Props = InterfaceModalProps & {
  open: boolean;
  title: string;
  description: string;
  noLabel: string;
  yesLabel: string;
  onNo: () => void;
  onYes: () => void;
  yesButtonWarning?: boolean;
};

const ConfirmationModal = ({
  open,
  title,
  description,
  noLabel,
  yesLabel,
  yesButtonWarning = true,
  onNo,
  onYes,
}: Props) => {
  return (
    <Modal isOpen={open} onClose={onNo} safeAreaTop={true}>
      <Modal.Content bg="container.light" maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header bg="container.light" borderColor="divider.primary">
          <Text size="subtitle">{title}</Text>
        </Modal.Header>
        <Modal.Body bg="container.light">
          <Text>{description}</Text>
        </Modal.Body>
        <Modal.Footer bg="container.light" borderColor="divider.primary">
          <View style={styles.buttonContainer}>
            <Button
              variant="outline"
              style={styles.button}
              title={noLabel}
              onPress={onNo}
            />
            <Button
              warning={yesButtonWarning}
              style={styles.button}
              title={yesLabel}
              onPress={onYes}
            />
          </View>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmationModal;
