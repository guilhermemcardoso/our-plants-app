import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Platform } from 'react-native';
import { TextInput, Text } from '~/shared/components';
import { styles } from './styles';
import {
  SignUpValidationErrors,
  getErrorByField,
  validate,
} from './validations';
import Button from '~/shared/components/button';
import Container from '~/shared/components/container';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UnsignedStackParamList } from '~/navigation/stacks/signed-out';
import { SignUpData } from '../types';
import { useSignUp } from '~/hooks/use-sign-up';
import { KeyboardAvoidingView, ScrollView } from 'native-base';
import { useAlert } from '~/hooks/use-alert';

type Props = NativeStackScreenProps<UnsignedStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: Props) => {
  const { showAlert } = useAlert();
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

  const goToConfirmation = useCallback(() => {
    navigation.navigate('EmailConfirmation', { email: signUpData.email });
  }, [navigation, signUpData]);

  useEffect(() => {
    if (onResponse.status === 400) {
      showAlert({ alertType: 'error', title: 'Algo deu errado.' });
    }

    if (onResponse.status === 409) {
      showAlert({ alertType: 'error', title: 'Email já cadastrado.' });
    }

    if (onResponse.status === 503) {
      showAlert({
        alertType: 'error',
        title: 'Serviço indisponível, verifique sua conexão de internet.',
      });
    }

    if (onResponse.status === 201) {
      goToConfirmation();
    }
  }, [onResponse, goToConfirmation, showAlert]);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <TextInput
              style={styles.textField}
              onChangeText={(text) => handleOnChange(text, 'name')}
              onBlur={() => handleOnBlur('name')}
              value={signUpData.name}
              entryType="text"
              placeholder="Nome"
              error={errors.name}
            />
            <TextInput
              style={styles.textField}
              onChangeText={(text) => handleOnChange(text, 'lastname')}
              onBlur={() => handleOnBlur('lastname')}
              value={signUpData.lastname}
              entryType="text"
              placeholder="Sobrenome"
              error={errors.lastname}
            />
            <TextInput
              style={styles.textField}
              onChangeText={(text) => handleOnChange(text, 'email')}
              onBlur={() => handleOnBlur('email')}
              entryType="email"
              value={signUpData.email}
              placeholder="Email"
              error={errors.email}
            />
            <TextInput
              style={styles.textField}
              onChangeText={(text) => handleOnChange(text, 'password')}
              onBlur={() => handleOnBlur('password')}
              value={signUpData.password}
              entryType="password"
              placeholder="Senha"
              error={errors.password}
            />
            <TextInput
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
        <View style={styles.signInContainer}>
          <Text>Já possui conta?</Text>
          <Button
            onPress={onSignUpPress}
            variant={'link'}
            title="Acesse aqui"
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignUp;
