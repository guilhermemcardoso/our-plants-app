import React from 'react';
import { Container, Text } from '~/shared/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import styles from './styles';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.EVALUATE_COMPLAINT
>;

const EvaluateComplaint = ({ route, navigation }: Props) => {
  const { complaint } = route.params;

  return (
    <Container>
      <Text>Evaluate Complaint</Text>
      <Text>{JSON.stringify(complaint)}</Text>
    </Container>
  );
};

export default EvaluateComplaint;
