import React, { useState } from 'react';
import { Modal, View } from 'native-base';
import { InterfaceModalProps } from 'native-base/lib/typescript/components/composites/Modal/types';
import { Button, CheckButton, Text, TextArea } from '~/shared/components';
import styles from './styles';

type Props = InterfaceModalProps & {
  open: boolean;
  onCancel: () => void;
  onEvaluate: (evaluation: string, wasHelpful: boolean) => void;
};

const ConfirmationModal = ({ open, onCancel, onEvaluate }: Props) => {
  const [emptyEvaluationError, setEmptyEvaluationError] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [wasHelpful, setWasHelpful] = useState(false);

  const handleOnChange = (text: string) => {
    setEvaluation(text);
  };

  const onToggle = () => {
    setWasHelpful(!wasHelpful);
  };

  const onSubmit = () => {
    if (evaluation.length <= 0) {
      setEmptyEvaluationError('A nota de avaliação é obrigatória');
      return;
    }
    onEvaluate(evaluation, wasHelpful);
  };
  return (
    <Modal isOpen={open} onClose={onCancel} safeAreaTop={true}>
      <Modal.Content bg="container.light" maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header bg="container.light" borderColor="divider.primary">
          <Text size="subtitle">Avaliar denúncia</Text>
        </Modal.Header>
        <Modal.Body bg="container.light">
          <Text style={styles.evaluationLabel}>
            Digite uma nota para a avaliação da denúncia:
          </Text>
          <TextArea
            onChangeText={(text) => handleOnChange(text)}
            value={evaluation}
            placeholder="Nota da avaliação"
            error={emptyEvaluationError}
          />
          <View style={styles.checkContainer}>
            <Text style={styles.checkLabel}>Esta denúncia foi útil?</Text>
            <CheckButton onPress={onToggle} checked={wasHelpful} />
          </View>
        </Modal.Body>
        <Modal.Footer bg="container.light" borderColor="divider.primary">
          <View style={styles.buttonContainer}>
            <Button
              variant="outline"
              style={styles.button}
              title="CANCELAR"
              onPress={onCancel}
            />
            <Button style={styles.button} title="AVALIAR" onPress={onSubmit} />
          </View>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmationModal;
