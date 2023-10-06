import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Header,
  IconButton,
  Text,
  TextInput,
} from '~/shared/components';
import { ScrollView, View } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { useSpecieStore } from '~/store/specie-store';
import { CreateEditSpecieData } from '../types';
import { CreateEditSpecieValidationErrors, validate } from '../validations';
import { getErrorByField } from '../validations';
import styles from './styles';
import { useCreateSpecie } from '~/hooks/use-create-specie';
import { useLoading } from '~/hooks/use-loading';
import { useAlert } from '~/hooks/use-alert';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.CREATE_EDIT_SPECIE
>;

const CreateEditSpecie = ({ route, navigation }: Props) => {
  const { specie } = route.params;
  const { createSpecie, isLoading, onResponse } = useCreateSpecie();
  const { setLoading } = useLoading();
  const species = useSpecieStore((state) => state.species);
  const [specieData, setSpecieData] = useState<CreateEditSpecieData>({
    popular_name: '',
    scientific_name: '',
  });
  const [errors, setErrors] = useState<CreateEditSpecieValidationErrors>({
    popular_name: '',
    scientific_name: '',
  });
  const { showAlert } = useAlert();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleChangeSpecieValue = ({
    field,
    value,
  }: {
    field: keyof CreateEditSpecieData;
    value: string | number;
  }) => {
    setSpecieData({ ...specieData, [field]: value });
  };

  const validateField = (field: keyof CreateEditSpecieValidationErrors) => {
    const validation = validate(specieData);
    if (!validation.success) {
      const error = getErrorByField(validation.error, field);
      setErrors({ ...errors, [field]: error });
      return;
    }

    setErrors({
      popular_name: '',
      scientific_name: '',
    });
  };

  const handleOnBlur = (field: string) => {
    validateField(field as keyof CreateEditSpecieValidationErrors);
  };

  const alreadyExists = () => {
    const filtered = species.filter((item) => {
      return (
        item.popular_name.replace(' ', '').toLowerCase() ===
        specieData.popular_name.replace(' ', '').toLowerCase()
      );
    });

    return filtered.length > 0;
  };

  const onSubmitPress = async () => {
    const validation = validate(specieData);
    if (!validation.success) {
      const errorsByField: CreateEditSpecieValidationErrors = {
        popular_name: '',
        scientific_name: '',
      };
      Object.keys(errorsByField).forEach((field) => {
        const error = getErrorByField(
          validation.error,
          field as keyof CreateEditSpecieValidationErrors
        );
        errorsByField[field as keyof CreateEditSpecieValidationErrors] = error;
      });
      setErrors(errorsByField);
      return;
    }

    if (!specie && alreadyExists()) {
      showAlert({
        alertType: 'error',
        title: 'Essa espécie de planta já existe.',
      });
      return;
    }

    createSpecie(specieData);
  };

  useEffect(() => {
    if (onResponse.status === 201) {
      showAlert({
        alertType: 'success',
        title: 'Espécie cadastrada com sucesso.',
      });
    }

    if (onResponse.status === 503) {
      showAlert({
        alertType: 'error',
        title: 'Serviço indisponível, verifique sua conexão de internet.',
      });
    }

    if ([400, 500, 404].includes(onResponse.status || 0)) {
      showAlert({
        alertType: 'error',
        title: 'Algo deu errado. Tente novamente mais tarde.',
      });
    }
  }, [onResponse, showAlert]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <Container>
      <ScrollView>
        <Header
          title={specie ? 'Editar Espécie' : 'Cadastrar Espécie'}
          LeftComponent={
            <IconButton
              size={26}
              iconName="ios-arrow-back"
              onPress={handleBackPress}
            />
          }
        />
        <View bgColor="container.dark" style={styles.infoContainer}>
          <Text style={styles.sectionLabel}>Informações da espécie</Text>
          <TextInput
            onBlur={() => handleOnBlur('popular_name')}
            style={styles.input}
            onChangeText={(text) =>
              handleChangeSpecieValue({ field: 'popular_name', value: text })
            }
            placeholder="Nome popular da espécie"
            label="Nome popular:"
            value={specieData?.popular_name}
            error={errors.popular_name}
          />
          <TextInput
            onBlur={() => handleOnBlur('scientific_name')}
            style={styles.input}
            onChangeText={(text) =>
              handleChangeSpecieValue({ field: 'scientific_name', value: text })
            }
            placeholder="Nome científico da espécie"
            label="Nome científico:"
            value={specieData?.scientific_name}
            error={errors.scientific_name}
          />
        </View>
        <Button
          onPress={onSubmitPress}
          style={styles.createEditButton}
          title={specie ? 'EDITAR ESPÉCIE' : 'CADASTRAR ESPÉCIE'}
        />
      </ScrollView>
    </Container>
  );
};

export default CreateEditSpecie;
