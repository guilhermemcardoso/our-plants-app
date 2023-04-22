import React, { useEffect, useState } from 'react';
import { View, Image, Platform } from 'react-native';
import TextField from '~/shared/components/text-input';
import { styles } from './styles';
import {
  ForgotPasswordValidationErrors,
  getErrorByField,
  validate,
} from './validations';
import Button from '~/shared/components/button';
import Container from '~/shared/components/container';
import Text from '~/shared/components/text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UnsignedStackParamList } from '~/navigation/stacks/unsigned';
import { ForgotPasswordData } from '../types';
import { useForgotPassword } from '~/hooks/use-forgot-password';
import Alert from '~/shared/components/alert';
import { KeyboardAvoidingView } from 'native-base';

type Props = NativeStackScreenProps<UnsignedStackParamList, 'ForgotPassword'>;

const ForgotPassword = ({ navigation }: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const { isLoading, responseStatus, forgotPassword } = useForgotPassword();

  const [forgotPasswordData, setForgotPasswordData] =
    useState<ForgotPasswordData>({
      email: '',
    });
  const [errors, setErrors] = useState<ForgotPasswordValidationErrors>({
    email: '',
  });
  const [enableSubmit, setEnableSubmit] = useState(true);

  const onSubmitPress = () => {
    const validation = validate(forgotPasswordData);
    if (!validation.success) {
      const errorsByField: ForgotPasswordValidationErrors = {
        email: '',
      };
      Object.keys(errorsByField).forEach((field) => {
        const error = getErrorByField(
          validation.error,
          field as keyof ForgotPasswordValidationErrors
        );
        setEnableSubmit(false);
        errorsByField[field as keyof ForgotPasswordValidationErrors] = error;
      });
      setErrors(errorsByField);
      return;
    }
    forgotPassword(forgotPasswordData);
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const handleOnEmailChange = (text: string) => {
    const newForgotPasswordData: ForgotPasswordData = {
      ...forgotPasswordData,
      email: text,
    };
    setForgotPasswordData(newForgotPasswordData);
  };

  const validateField = (field: keyof ForgotPasswordValidationErrors) => {
    const validation = validate(forgotPasswordData);
    if (!validation.success) {
      const error = getErrorByField(validation.error, field);
      setEnableSubmit(false);
      setErrors({ ...errors, [field]: error });
      return;
    }
    setEnableSubmit(true);
    setErrors({ email: '' });
  };

  const handleOnEmailBlur = () => {
    validateField('email');
  };

  const onGoBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (responseStatus === 400) {
      setShowAlert(true);
    }
  }, [responseStatus]);

  return (
    <Container>
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('~/assets/images/logo.png')}
          />
          <Text size="title" style={styles.title}>
            Nossas Plantas
          </Text>
        </View>
        <Text size="subtitle" style={styles.subtitle}>
          Esqueci minha senha
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <TextField
            style={styles.textField}
            onChangeText={handleOnEmailChange}
            onBlur={handleOnEmailBlur}
            entryType="email"
            value={forgotPasswordData.email}
            placeholder="Email"
            error={errors.email}
          />
          <Button
            style={styles.forgotPasswordButton}
            disabled={!enableSubmit}
            onPress={onSubmitPress}
            isLoading={isLoading}
            title="ENTRAR"
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.goBackContainer}>
        <Button onPress={onGoBackPress} variant={'outline'} title="Voltar" />
      </View>
      <Alert
        show={showAlert}
        status="error"
        title="Algo deu errado"
        onClose={onCloseAlert}
      />
    </Container>
  );
};

export default ForgotPassword;