import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Platform } from 'react-native';
import TextField from '~/shared/components/text-input';
import { styles } from './styles';
import {
  SignInValidationErrors,
  getErrorByField,
  validate,
} from './validations';
import Button from '~/shared/components/button';
import Container from '~/shared/components/container';
import Text from '~/shared/components/text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UnsignedStackParamList } from '~/navigation/stacks/signed-out';
import { SignInData } from '../types';
import { useSignIn } from '~/hooks/use-sign-in';
import { KeyboardAvoidingView, ScrollView } from 'native-base';
import { useAlert } from '~/hooks/use-alert';

type Props = NativeStackScreenProps<UnsignedStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
  const { showAlert } = useAlert();
  const { isLoading, onResponse, signIn } = useSignIn();

  const [signInData, setSignInData] = useState<SignInData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<SignInValidationErrors>({
    email: '',
    password: '',
  });

  const onSubmitPress = () => {
    const validation = validate(signInData);
    if (!validation.success) {
      const errorsByField: SignInValidationErrors = { email: '', password: '' };
      Object.keys(errorsByField).forEach((field) => {
        const error = getErrorByField(
          validation.error,
          field as keyof SignInValidationErrors
        );
        errorsByField[field as keyof SignInValidationErrors] = error;
      });
      setErrors(errorsByField);
      return;
    }
    signIn(signInData);
  };

  const handleOnEmailChange = (text: string) => {
    const newSignInData: SignInData = { ...signInData, email: text };
    setSignInData(newSignInData);
  };

  const handleOnPasswordChange = (text: string) => {
    const newSignInData: SignInData = { ...signInData, password: text };
    setSignInData(newSignInData);
  };

  const validateField = (field: keyof SignInValidationErrors) => {
    const validation = validate(signInData);
    if (!validation.success) {
      const error = getErrorByField(validation.error, field);
      setErrors({ ...errors, [field]: error });
      return;
    }
    setErrors({ email: '', password: '' });
  };

  const handleOnEmailBlur = () => {
    validateField('email');
  };
  const handleOnPasswordBlur = () => {
    validateField('password');
  };

  const onForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };

  const onCreateAccountPress = () => {
    navigation.navigate('SignUp');
  };

  const goToConfirmation = useCallback(() => {
    navigation.navigate('EmailConfirmation', { email: signInData.email });
  }, [navigation, signInData]);

  useEffect(() => {
    if ([400, 401].includes(onResponse.status || 0)) {
      showAlert({ alertType: 'error', title: 'Usuário e/ou senha incorretos' });
    }
    //504

    if (onResponse.status === 423) {
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
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
            <TextField
              style={styles.textField}
              onChangeText={handleOnEmailChange}
              onBlur={handleOnEmailBlur}
              entryType="email"
              value={signInData.email}
              placeholder="Email"
              error={errors.email}
            />
            <TextField
              style={styles.textField}
              onChangeText={handleOnPasswordChange}
              onBlur={handleOnPasswordBlur}
              value={signInData.password}
              entryType="password"
              placeholder="Senha"
              error={errors.password}
            />
            <View style={styles.forgotPasswordContainer}>
              <Button
                onPress={onForgotPasswordPress}
                variant={'link'}
                title="Esqueci minha senha"
              />
            </View>
            <Button
              style={styles.signInButton}
              onPress={onSubmitPress}
              isLoading={isLoading}
              title="ENTRAR"
            />
          </KeyboardAvoidingView>
        </View>
        <View style={styles.signUpContainer}>
          <Text>Ainda não possui conta?</Text>
          <Button
            onPress={onCreateAccountPress}
            variant={'link'}
            title="Cadastre-se aqui"
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignIn;
