import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { styles } from './styles';
import Button from '~/shared/components/button';
import Container from '~/shared/components/container';
import Text from '~/shared/components/text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UnsignedStackParamList } from '~/navigation/stacks/signed-out';
import { useResendEmailConfirmation } from '~/hooks/use-resend-email-confirmation';
import { CommonActions } from '@react-navigation/native';
import { useAlert } from '~/hooks/use-alert';

type Props = NativeStackScreenProps<
  UnsignedStackParamList,
  'EmailConfirmation'
>;

const EmailConfirmation = ({ route, navigation }: Props) => {
  const { email } = route.params;
  const { isLoading, onResponse, resendEmailConfirmation } =
    useResendEmailConfirmation();
  const { showAlert } = useAlert();

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

  useEffect(() => {
    if (onResponse.status === 423) {
      showAlert({
        alertType: 'error',
        title:
          'Não foi possível enviar um novo link. É necessário esperar 2 minutos antes de solicitar um novo link.',
      });
    }

    if (onResponse.status === 503) {
      showAlert({
        alertType: 'error',
        title: 'Serviço indisponível, verifique sua conexão de internet.',
      });
    }

    if ([400, 500].includes(onResponse.status || 0)) {
      showAlert({
        alertType: 'error',
        title: 'Algo deu errado.',
      });
    }

    if (onResponse.status === 200) {
      showAlert({
        alertType: 'error',
        title:
          'Um novo link foi enviado para seu email. Por favor, verifique sua caixa de entrada.',
      });
    }
  }, [onResponse, showAlert]);

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
    </Container>
  );
};

export default EmailConfirmation;
