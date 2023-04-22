import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { styles } from './styles';
import Button from '~/shared/components/button';
import Container from '~/shared/components/container';
import Text from '~/shared/components/text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UnsignedStackParamList } from '~/navigation/stacks/unsigned';
import { useResendEmailConfirmation } from '~/hooks/use-resend-email-confirmation';
import Alert from '~/shared/components/alert';
import { CommonActions } from '@react-navigation/native';

type Props = NativeStackScreenProps<
  UnsignedStackParamList,
  'EmailConfirmation'
>;

const EmailConfirmation = ({ route, navigation }: Props) => {
  const { email } = route.params;
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('error');
  const [alertMessage, setAlertMessage] = useState('');
  const { isLoading, onResponse, resendEmailConfirmation } =
    useResendEmailConfirmation();

  const onSubmitPress = async () => {
    resendEmailConfirmation({ email });
  };

  const onGoBackPress = () => {
    // navigation.goBack();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      })
    );
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (onResponse.status === 423) {
      setAlertMessage(
        'Não foi possível enviar um novo link. É necessário esperar 2 minutos antes de solicitar um novo link.'
      );
      setAlertStatus('error');
      setShowAlert(true);
    }

    if ([400, 500].includes(onResponse.status || 0)) {
      setAlertMessage('Algo deu errado.');
      setAlertStatus('error');
      setShowAlert(true);
    }

    if (onResponse.status === 200) {
      setAlertMessage(
        'Um novo link foi enviado para seu email. Por favor, verifique sua caixa de entrada.'
      );
      setAlertStatus('success');
      setShowAlert(true);
    }
  }, [onResponse]);

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
          Confirmação de Email
        </Text>
        <Text style={styles.message}>
          {`Um link de confirmação foi enviado para o email ${email}. Caso você não tenha recebido, você pode solicitar o reenvio do link de confirmação.`}
        </Text>
        <Text variant="error" style={styles.note}>
          Atenção: é preciso aguardar 2 minutos antes de solicitar um novo link
          de confirmação.
        </Text>
        <Button onPress={onGoBackPress} title="VOLTAR" />
        <Button
          variant={'outline'}
          style={styles.resendButton}
          onPress={onSubmitPress}
          isLoading={isLoading}
          title="REENVIAR"
        />
      </View>
      <Alert
        show={showAlert}
        status={alertStatus}
        title={alertMessage}
        onClose={onCloseAlert}
      />
    </Container>
  );
};

export default EmailConfirmation;
