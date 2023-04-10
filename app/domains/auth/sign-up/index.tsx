import React, { useEffect, useState } from 'react';
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
  const { isLoading, responseStatus, signUp } = useSignUp();

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
  const [enableSubmit, setEnableSubmit] = useState(false);

  const onSubmitPress = async () => {
    await signUp(signUpData);
  };

  const handleOnChange = (text: string, field: string) => {
    const newSignUpData: SignUpData = { ...signUpData, [field]: text };
    setSignUpData(newSignUpData);
  };

  const checkMatchingPassword = () => {
    if (signUpData.password !== signUpData.repassword) {
      const error = 'Confirmação de senha diferente da senha';
      setEnableSubmit(false);
      setErrors({ ...errors, repassword: error });
      return;
    }
  };

  const validateField = (field: keyof SignUpValidationErrors) => {
    if (field === 'repassword' && signUpData.repassword.length > 0) {
      checkMatchingPassword();
      return;
    }

    const validation = validate(signUpData);
    if (!validation.success) {
      const error = getErrorByField(validation.error, field);
      setEnableSubmit(false);
      setErrors({ ...errors, [field]: error });
      return;
    }
    setEnableSubmit(true);
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

  const onSignInPress = () => {
    navigation.goBack();
  };

  const onCloseAlert = () => {
    setShowAlert(false);
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
          Cadastro de usuário
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
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
            disabled={!enableSubmit}
            onPress={onSubmitPress}
            isLoading={isLoading}
            title="CADASTRAR"
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.signInContainer}>
        <Text>Já possui conta?</Text>
        <Button onPress={onSignInPress} variant={'link'} title="Acesse aqui" />
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

export default SignUp;
