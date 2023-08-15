import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Container,
  EvaluationModal,
  Header,
  IconButton,
  Slideshow,
  Text,
} from '~/shared/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import styles from './styles';
import { ScrollView, View } from 'native-base';
import { useEvaluateComplaint } from '~/hooks/use-evaluate-complaint';
import { useLoading } from '~/hooks/use-loading';
import MapView from '~/shared/components/map-view';
import MarkerView from '~/shared/components/marker-view';
import { dimens } from '~/theme/dimens';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.EVALUATE_COMPLAINT
>;

const EvaluateComplaint = ({ route, navigation }: Props) => {
  const { complaint } = route.params;

  const { setLoading } = useLoading();
  const {
    onResponse: onEvaluateComplaintResponse,
    isLoading: isEvaluateComplaintLoading,
    evaluateComplaint,
  } = useEvaluateComplaint();

  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [alertMessage, setAlertMessage] = useState('');

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onCloseAlert = () => setShowAlert(false);
  const onOpenEvaluationModal = () => setShowEvaluationModal(true);
  const onCancelPress = () => setShowEvaluationModal(false);

  const onEvaluatePress = async (evaluation: string, wasHelpful: boolean) => {
    if (complaint) {
      evaluateComplaint(complaint?._id, evaluation, wasHelpful);
    }
  };

  useEffect(() => {
    setLoading(isEvaluateComplaintLoading);
  }, [isEvaluateComplaintLoading, setLoading]);

  useEffect(() => {
    if (onEvaluateComplaintResponse.status === 200) {
      setAlertMessage('Denúncia excluída com sucesso');
      setAlertType('success');
      setShowAlert(true);
      onBackPress();
    }
    if ([400, 500, 404].includes(onEvaluateComplaintResponse.status || 0)) {
      setAlertMessage('Algo deu errado. Tente novamente mais tarde');
      setAlertType('error');
      setShowAlert(true);
    }
  }, [onEvaluateComplaintResponse, onBackPress]);

  return (
    <Container style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Header
            title={'Detalhes da denúncia'}
            LeftComponent={
              <IconButton
                size={26}
                iconName="ios-arrow-back"
                onPress={onBackPress}
              />
            }
          />
        </View>
        <View bgColor="container.dark" style={styles.infoContainer}>
          <Text style={styles.sectionLabel}>Informações da denúncia</Text>
          <Text style={styles.label}>
            Razão: <Text style={styles.content}>{complaint?.reason}</Text>
          </Text>
          <Text style={styles.label}>
            Descrição:{' '}
            <Text style={styles.content}>{complaint?.description}</Text>
          </Text>
        </View>
        {!complaint?.plant_id.deleted ? (
          <View bgColor="container.dark" style={styles.infoContainer}>
            <Text style={styles.sectionLabel}>Informações da planta</Text>
            <Text style={styles.label}>
              Espécie:{' '}
              <Text style={styles.content}>
                {complaint?.plant_id.specie_id.popular_name}
              </Text>
            </Text>
            <Text style={styles.label}>
              Descrição:{' '}
              <Text style={styles.content}>
                {complaint?.plant_id.description}
              </Text>
            </Text>
            <Text style={styles.label}>Localização:</Text>

            <View style={styles.mapContainer}>
              <MapView
                latitude={complaint?.plant_id?.location.coordinates[1] || 0}
                longitude={complaint?.plant_id?.location.coordinates[0] || 0}
              >
                <MarkerView
                  plant={complaint?.plant_id}
                  latitude={complaint?.plant_id?.location.coordinates[1] || 0}
                  longitude={complaint?.plant_id?.location.coordinates[0] || 0}
                />
              </MapView>
            </View>
            <Slideshow
              borderRadius={dimens.radius.md}
              images={complaint?.plant_id?.images || []}
            />
          </View>
        ) : (
          <View bgColor="container.dark" style={styles.infoContainer}>
            <Text variant="label" style={styles.removedLabel}>
              A planta foi removida do sistema.
            </Text>
          </View>
        )}
        {!complaint?.closed && !complaint?.deleted && (
          <Button
            onPress={onOpenEvaluationModal}
            style={styles.deleteButton}
            title={'AVALIAR DENÚNCIA'}
          />
        )}
      </ScrollView>
      <EvaluationModal
        open={showEvaluationModal}
        onEvaluate={onEvaluatePress}
        onCancel={onCancelPress}
      />
      <Alert
        show={showAlert}
        status={alertType}
        title={alertMessage}
        onClose={onCloseAlert}
      />
    </Container>
  );
};

export default EvaluateComplaint;
