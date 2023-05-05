import React, { useRef, useState } from 'react';
import { Modal, View } from 'native-base';
import { InterfaceModalProps } from 'native-base/lib/typescript/components/composites/Modal/types';
import { Button, Text, TextInput } from '~/shared/components';
import styles from './styles';
import { ChangePasswordData } from './types';
import {
  ChangePasswordValidationErrors,
  getErrorByField,
  validate,
} from './validations';
import { TextInput as Input } from 'react-native';

type Props = InterfaceModalProps & {
  open: boolean;
  noLabel: string;
  yesLabel: string;
  onNo: () => void;
  onYes: (data: ChangePasswordData) => void;
  yesButtonWarning?: boolean;
};

const ChangePasswordModal = ({
  open,
  noLabel,
  yesLabel,
  yesButtonWarning = true,
  onNo,
  onYes,
}: Props) => {
  const currentPasswordRef = useRef<Input>(null);
  const newPasswordRef = useRef<Input>(null);
  const repasswordRef = useRef<Input>(null);

  const [changePasswordData, setChangePasswordData] =
    useState<ChangePasswordData>({
      current: '',
      password: '',
      repassword: '',
    });
  const [errors, setErrors] = useState<ChangePasswordValidationErrors>({
    current: '',
    password: '',
    repassword: '',
  });

  const onCancelPress = () => {
    currentPasswordRef.current?.blur();
    newPasswordRef.current?.blur();
    repasswordRef.current?.blur();

    setChangePasswordData({
      current: '',
      password: '',
      repassword: '',
    });
    setErrors({
      current: '',
      password: '',
      repassword: '',
    });
    onNo();
  };

  const onSubmitPress = async () => {
    const validation = validate(changePasswordData);
    if (!validation.success) {
      const errorsByField: ChangePasswordValidationErrors = {
        current: '',
        password: '',
        repassword: '',
      };
      Object.keys(errorsByField).forEach((field) => {
        const error = getErrorByField(
          validation.error,
          field as keyof ChangePasswordValidationErrors
        );
        errorsByField[field as keyof ChangePasswordValidationErrors] = error;
      });

      setErrors(errorsByField);
      return;
    }

    if (checkMatchingPassword()) {
      onYes(changePasswordData);
    }
  };

  const handleOnChange = (text: string, field: string) => {
    const newChangePasswordData: ChangePasswordData = {
      ...changePasswordData,
      [field]: text,
    };
    setChangePasswordData(newChangePasswordData);
  };

  const checkMatchingPassword = () => {
    if (changePasswordData.password !== changePasswordData.repassword) {
      const error = 'Confirmação de senha diferente da senha';
      setErrors({ ...errors, repassword: error });
      return false;
    }

    setErrors({ ...errors, repassword: '' });
    return true;
  };

  const validateField = (field: keyof ChangePasswordValidationErrors) => {
    if (field === 'repassword' && changePasswordData.repassword.length > 0) {
      checkMatchingPassword();
      return;
    }

    const validation = validate(changePasswordData);
    if (!validation.success) {
      const error = getErrorByField(validation.error, field);
      setErrors({ ...errors, [field]: error });
      return;
    }
    setErrors({
      current: '',
      password: '',
      repassword: '',
    });
  };

  const handleOnBlur = (field: string) => {
    validateField(field as keyof ChangePasswordValidationErrors);
  };

  return (
    <Modal isOpen={open} onClose={onNo} safeAreaTop={true}>
      <Modal.Content bg="container.light" maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header bg="container.light" borderColor="divider.primary">
          <Text size="subtitle">Trocar senha</Text>
        </Modal.Header>
        <Modal.Body bg="container.light">
          <View>
            <TextInput
              ref={currentPasswordRef}
              style={styles.textField}
              onChangeText={(text) => handleOnChange(text, 'current')}
              onBlur={() => handleOnBlur('current')}
              value={changePasswordData.current}
              entryType="password"
              placeholder="Senha Atual"
              error={errors.current}
            />
            <TextInput
              ref={newPasswordRef}
              style={styles.textField}
              onChangeText={(text) => handleOnChange(text, 'password')}
              onBlur={() => handleOnBlur('password')}
              value={changePasswordData.password}
              entryType="password"
              placeholder="Nova Senha"
              error={errors.password}
            />
            <TextInput
              ref={repasswordRef}
              style={styles.textField}
              onChangeText={(text) => handleOnChange(text, 'repassword')}
              onBlur={() => handleOnBlur('repassword')}
              value={changePasswordData.repassword}
              entryType="password"
              placeholder="Confirmar senha"
              error={errors.repassword}
            />
          </View>
        </Modal.Body>
        <Modal.Footer bg="container.light" borderColor="divider.primary">
          <View style={styles.buttonContainer}>
            <Button
              variant="outline"
              style={styles.button}
              title={noLabel}
              onPress={onCancelPress}
            />
            <Button
              warning={yesButtonWarning}
              style={styles.button}
              title={yesLabel}
              onPress={onSubmitPress}
            />
          </View>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ChangePasswordModal;
