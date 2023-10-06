import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Header,
  IconButton,
  Selector,
  Text,
  TextInput,
} from '~/shared/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import styles from './styles';
import { ScrollView, View } from 'native-base';
import {
  CreateComplaintValidationErrors,
  getErrorByField,
  validate,
} from '../validations';
import { CreateComplaintData } from '../types';
import { REASON_OPTIONS } from '~/shared/constants/constants';
import { useLoading } from '~/hooks/use-loading';
import { useCreateComplaint } from '~/hooks/use-create-complaint';
import { usePlantStore } from '~/store/plant-store';
import { useAlert } from '~/hooks/use-alert';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.CREATE_COMPLAINT
>;

const CreateComplaint = ({ navigation }: Props) => {
  const { setLoading } = useLoading();
  const {
    onResponse: onCreateComplaintResponse,
    isLoading: isCreateComplaintLoading,
    createComplaint,
  } = useCreateComplaint();
  const selectedPlant = usePlantStore((state) => state.selectedPlant);
  const [showSelector, setShowSelector] = useState(false);
  const { showAlert } = useAlert();
  const [selectedReason, setSelectedReason] = useState('');
  const [complaintData, setComplaintData] = useState<CreateComplaintData>({
    reason: '',
    description: '',
    plant_id: '',
  });
  const [errors, setErrors] = useState<CreateComplaintValidationErrors>({
    reason: '',
    description: '',
    plant_id: '',
  });

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onCloseSelector = () => {
    setShowSelector(false);
  };

  const onOpenSelector = () => {
    setShowSelector(true);
  };

  const onSelectReason = (selected: string) => {
    setShowSelector(false);
    const reason = REASON_OPTIONS.find((item) => item === selected);

    if (reason) {
      setComplaintData({ ...complaintData, reason: reason });
      setSelectedReason(reason);
    }
  };

  const handleChangeComplaintValue = ({
    field,
    value,
  }: {
    field: keyof CreateComplaintData;
    value: string | number;
  }) => {
    setComplaintData({ ...complaintData, [field]: value });
  };

  const validateField = (field: keyof CreateComplaintValidationErrors) => {
    const validation = validate(complaintData);
    if (!validation.success) {
      const error = getErrorByField(validation.error, field);
      setErrors({ ...errors, [field]: error });
      return;
    }

    setErrors({
      reason: '',
      description: '',
      plant_id: '',
    });
  };

  const handleOnBlur = (field: string) => {
    validateField(field as keyof CreateComplaintValidationErrors);
  };

  const onSubmitPress = async () => {
    if (selectedPlant) {
      setComplaintData({ ...complaintData, plant_id: selectedPlant?._id });
    }
    const validation = validate(complaintData);
    if (!validation.success) {
      const errorsByField: CreateComplaintValidationErrors = {
        reason: '',
        description: '',
        plant_id: '',
      };
      Object.keys(errorsByField).forEach((field) => {
        const error = getErrorByField(
          validation.error,
          field as keyof CreateComplaintValidationErrors
        );
        errorsByField[field as keyof CreateComplaintValidationErrors] = error;
      });
      setErrors(errorsByField);
      return;
    }

    createComplaint(complaintData);
  };

  useEffect(() => {
    setLoading(isCreateComplaintLoading);
  }, [isCreateComplaintLoading, setLoading]);

  useEffect(() => {
    if (onCreateComplaintResponse.status === 201) {
      showAlert({
        alertType: 'success',
        title: 'Denúncia cadastrada com sucesso.',
      });
      onBackPress();
    }
    if ([400, 500, 404].includes(onCreateComplaintResponse.status || 0)) {
      showAlert({
        alertType: 'error',
        title: 'Algo deu errado. Tente novamente mais tarde.',
      });
    }
  }, [onCreateComplaintResponse, onBackPress, showAlert]);

  return (
    <Container>
      <ScrollView>
        <Header
          title={'Cadastrar denúncia'}
          LeftComponent={
            <IconButton
              size={26}
              iconName="ios-arrow-back"
              onPress={onBackPress}
            />
          }
        />
        <View bgColor="container.dark" style={styles.infoContainer}>
          <Text style={styles.sectionLabel}>Informações da denúncia</Text>
          <Selector
            error={errors.reason}
            placeholder="Razão/motivo da denúncia"
            label="Razão:"
            value={selectedReason}
            options={REASON_OPTIONS}
            onSelect={onSelectReason}
            onClose={onCloseSelector}
            onOpen={onOpenSelector}
            show={showSelector}
          />
          <TextInput
            style={styles.descriptionInput}
            onBlur={() => handleOnBlur('description')}
            onChangeText={(text) =>
              handleChangeComplaintValue({ field: 'description', value: text })
            }
            placeholder="Breve descrição da denúncia"
            label="Descrição:"
            value={complaintData?.description}
            error={errors.description}
          />
        </View>
        <Button
          onPress={onSubmitPress}
          style={styles.createButton}
          title={'CADASTRAR DENÚNCIA'}
        />
      </ScrollView>
    </Container>
  );
};

export default CreateComplaint;
