import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Platform } from 'react-native';
import TextField from '~/shared/components/text-input';
import { styles } from './styles';
import {
  SignUpValidationErrors,
  getErrorByField,
  validate,
} from './validations';
import Button from '~/shared/components/button';
import Container from '~/shared/components/container';
import Text from '~/shared/components/text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UnsignedStackParamList } from '~/navigation/stacks/unsigned';
import { SignUpData } from '../types';
import { useSignUp } from '~/hooks/use-sign-up';
import { KeyboardAvoidingView } from 'native-base';
import Alert from '~/shared/components/alert';

type Props = NativeStackScreenProps<UnsignedStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { isLoading, onResponse, signUp } = useSignUp();

  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: '',
    password: '',
    repassword: '',
    name: '',
    lastname: '',
  });
  const [errors, setErrors] = useState<SignUpValidationErrors>({
    email: '',
    password: '',
    repassword: '',
    name: '',
    lastname: '',
  });

  const onSubmitPress = async () => {
    const validation = validate(signUpData);
    if (!validation.success) {
      const errorsByField: SignUpValidationErrors = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        repassword: '',
      };
      Object.keys(errorsByField).forEach((field) => {
        const error = getErrorByField(
          validation.error,
          field as keyof SignUpValidationErrors
        );
        errorsByField[field as keyof SignUpValidationErrors] = error;
      });
      setErrors(errorsByField);
      return;
    }
    signUp(signUpData);
  };

  const handleOnChange = (text: string, field: string) => {
    const newSignUpData: SignUpData = { ...signUpData, [field]: text };
    setSignUpData(newSignUpData);
  };

  const checkMatchingPassword = () => {
    if (signUpData.password !== signUpData.repassword) {
      const error = 'Confirmação de senha diferente da senha';
      setErrors({ ...errors, repassword: error });
      return;
    }

    setErrors({ ...errors, repassword: '' });
  };

  const validateField = (field: keyof SignUpValidationErrors) => {
    if (field === 'repassword' && signUpData.repassword.length > 0) {
      checkMatchingPassword();
    }

    const validation = validate(signUpData);
    if (!validation.success) {
      const error = getErrorByField(validation.error, field);
      setErrors({ ...errors, [field]: error });
      return;
    }
    setErrors({
      email: '',
      password: '',
      repassword: '',
      name: '',
      lastname: '',
    });
  };

  const handleOnBlur = (field: string) => {
    validateField(field as keyof SignUpValidationErrors);
  };

  const onSignUpPress = () => {
    navigation.goBack();
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const goToConfirmation = useCallback(() => {
    navigation.navigate('EmailConfirmation', { email: signUpData.email });
  }, [navigation, signUpData]);

  useEffect(() => {
    if (onResponse.status === 400) {
      setAlertMessage('Algo deu errado.');
      setShowAlert(true);
    }

    if (onResponse.status === 409) {
      setAlertMessage('Email já cadastrado.');
      setShowAlert(true);
    }

    if (onResponse.status === 201) {
      goToConfirmation();
    }
  }, [onResponse, goToConfirmation]);

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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <Text size="subtitle" style={styles.subtitle}>
            Cadastro de usuário
          </Text>
          <TextField
            style={styles.textField}
            onChangeText={(text) => handleOnChange(text, 'name')}
            onBlur={() => handleOnBlur('name')}
            value={signUpData.name}
            entryType="text"
            placeholder="Nome"
            error={errors.name}
          />
          <TextField
            style={styles.textField}
            onChangeText={(text) => handleOnChange(text, 'lastname')}
            onBlur={() => handleOnBlur('lastname')}
            value={signUpData.lastname}
            entryType="text"
            placeholder="Sobrenome"
            error={errors.lastname}
          />
          <TextField
            style={styles.textField}
            onChangeText={(text) => handleOnChange(text, 'email')}
            onBlur={() => handleOnBlur('email')}
            entryType="email"
            value={signUpData.email}
            placeholder="Email"
            error={errors.email}
          />
          <TextField
            style={styles.textField}
            onChangeText={(text) => handleOnChange(text, 'password')}
            onBlur={() => handleOnBlur('password')}
            value={signUpData.password}
            entryType="password"
            placeholder="Senha"
            error={errors.password}
          />
          <TextField
            style={styles.textField}
            onChangeText={(text) => handleOnChange(text, 'repassword')}
            onBlur={() => handleOnBlur('repassword')}
            value={signUpData.repassword}
            entryType="password"
            placeholder="Confirmar senha"
            error={errors.repassword}
          />
          <Button
            style={styles.signUpButton}
            onPress={onSubmitPress}
            isLoading={isLoading}
            title="CADASTRAR"
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.signUpContainer}>
        <Text>Já possui conta?</Text>
        <Button onPress={onSignUpPress} variant={'link'} title="Acesse aqui" />
      </View>
      <Alert
        show={showAlert}
        status="error"
        title={alertMessage}
        onClose={onCloseAlert}
      />
    </Container>
  );
};

export default SignUp;
