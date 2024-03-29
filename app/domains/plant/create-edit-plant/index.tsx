import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Container,
  Header,
  IconButton,
  ImageCarousel,
  ImagePicker,
  Selector,
  Text,
  TextInput,
} from '~/shared/components';
import { ScrollView, View } from 'native-base';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { useSpecieStore } from '~/store/specie-store';
import { CreateEditPlantData } from '../types';
import { CreateEditPlantValidationErrors, validate } from '../validations';
import MapView from '~/shared/components/map-view';
import MarkerView from '~/shared/components/marker-view';
import { Asset } from 'react-native-image-picker';
import { getErrorByField } from '../validations';
import { MAX_IMAGES } from '~/shared/constants/constants';
import { Location } from '~/shared/types';
import { useLocation } from '~/hooks/use-location';
import { useCreateEditPlant } from '~/hooks/use-create-edit-plant';
import { useLoading } from '~/hooks/use-loading';
import { Image } from '~/types/image';
import { useAlert } from '~/hooks/use-alert';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.CREATE_EDIT_PLANT
>;

const CreateEditPlant = ({ route, navigation }: Props) => {
  const { plant } = route.params;
  const {
    onResponse: onCreateEditPlantResponse,
    isLoading: isCreateEditPlantLoading,
    createPlant,
    editPlant,
  } = useCreateEditPlant();
  const { setLoading } = useLoading();
  const { currentLocation } = useLocation();
  const species = useSpecieStore((state) => state.species);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [canAddImages, setcanAddImages] = useState(false);
  const [selectedSpecie, setSelectedSpecie] = useState('');
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [plantData, setPlantData] = useState<CreateEditPlantData>({
    description: '',
    latitude: String(currentLocation?.coordinates[0] || 0),
    longitude: String(currentLocation?.coordinates[1] || 0),
    specie_id: '',
    images: [],
  });
  const [errors, setErrors] = useState<CreateEditPlantValidationErrors>({
    description: '',
    latitude: '',
    longitude: '',
    specie_id: '',
    images: '',
  });
  const [mapZoom, setMapZoom] = useState(14);
  const { showAlert } = useAlert();

  const specieNames = useMemo(() => {
    return species.map((specie) => specie.popular_name);
  }, [species]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChangePlantValue = ({
    field,
    value,
  }: {
    field: keyof CreateEditPlantData;
    value: string | number;
  }) => {
    setPlantData({ ...plantData, [field]: value });
  };

  const handleSelectSpecie = (selected: string) => {
    setShowSelector(false);
    const specie = species.find((item) => item.popular_name === selected);

    if (specie) {
      setPlantData({ ...plantData, specie_id: specie._id });
      setSelectedSpecie(specie.popular_name);
    }
  };

  const handleCreateNewSpecie = () => {
    onCloseSelector();
    navigation.navigate(Routes.CREATE_EDIT_SPECIE, { specie: undefined });
  };

  const handleCancelImagePicker = () => {
    setShowImagePicker(false);
  };

  const handleChangePlantLocation = ({
    location,
    zoom,
  }: {
    location: Location;
    zoom?: number;
  }) => {
    if (zoom) {
      setMapZoom(zoom);
    }
    setPlantData({
      ...plantData,
      latitude: String(location.coordinates[0]),
      longitude: String(location.coordinates[1]),
    });
  };

  const handleImageSelected = (images: Asset[]) => {
    setShowImagePicker(false);
    if (images.length === 0) {
      return;
    }

    const imageUris: string[] = plantData.images || [];
    const newSelectedImages = [...selectedImages];

    images.forEach((image) => {
      if (image.uri && imageUris.length < MAX_IMAGES) {
        imageUris.push(image.uri);
      }

      if (image && newSelectedImages.length < MAX_IMAGES) {
        newSelectedImages.push(image);
      }
    });

    setSelectedImages(newSelectedImages);
    setPlantData({ ...plantData, images: imageUris });
  };

  const handleImageDeleted = (image: Image) => {
    const imageUris: string[] = (plantData.images || []).filter((item) => {
      if (typeof image === 'string') {
        return item !== image;
      } else {
        return item !== image.uri;
      }
    });

    const newSelectedImages = [...selectedImages].filter((item) => {
      if (typeof item === 'string') {
        return imageUris.includes(item);
      } else {
        return item.uri && imageUris.includes(item.uri);
      }
    });

    setSelectedImages(newSelectedImages);
    setPlantData({ ...plantData, images: imageUris });
  };

  const handleImagePickerError = () => {};

  const onAddImagePress = () => {
    setShowImagePicker(true);
  };

  const validateField = (field: keyof CreateEditPlantValidationErrors) => {
    const validation = validate(plantData);
    if (!validation.success) {
      const error = getErrorByField(validation.error, field);
      setErrors({ ...errors, [field]: error });
      return;
    }

    setErrors({
      description: '',
      latitude: '',
      longitude: '',
      specie_id: '',
      images: '',
    });
  };

  const handleOnBlur = (field: string) => {
    validateField(field as keyof CreateEditPlantValidationErrors);
  };

  const onSubmitPress = async () => {
    const validation = validate(plantData);
    if (!validation.success) {
      const errorsByField: CreateEditPlantValidationErrors = {
        description: '',
        specie_id: '',
        latitude: '',
        longitude: '',
        images: '',
      };
      Object.keys(errorsByField).forEach((field) => {
        const error = getErrorByField(
          validation.error,
          field as keyof CreateEditPlantValidationErrors
        );
        errorsByField[field as keyof CreateEditPlantValidationErrors] = error;
      });
      setErrors(errorsByField);
      return;
    }

    if (!plant) {
      createPlant(plantData);
      return;
    }

    editPlant(plant._id, plantData);
  };

  const onCloseSelector = () => {
    setShowSelector(false);
  };

  const onOpenSelector = () => {
    setShowSelector(true);
  };

  useEffect(() => {
    if (plant) {
      setSelectedSpecie(plant.specie_id.popular_name);
      setPlantData({
        description: plant.description,
        images: plant.images,
        latitude: String(plant.location.coordinates[1]),
        longitude: String(plant.location.coordinates[0]),
        specie_id: plant.specie_id._id,
      });
      setSelectedImages(plant.images);
    }
  }, [plant]);

  useEffect(() => {
    setLoading(isCreateEditPlantLoading);
  }, [isCreateEditPlantLoading, setLoading]);

  useEffect(() => {
    setcanAddImages(selectedImages.length < 3);
  }, [selectedImages]);

  useEffect(() => {
    if (onCreateEditPlantResponse.status === 201) {
      showAlert({
        alertType: 'success',
        title: 'Planta cadastrada com sucesso',
      });
      handleBackPress();
    }
    if (onCreateEditPlantResponse.status === 200) {
      showAlert({
        alertType: 'success',
        title: 'Planta editada com sucesso',
      });
      handleBackPress();
    }

    if (onCreateEditPlantResponse.status === 503) {
      showAlert({
        alertType: 'error',
        title: 'Serviço indisponível, verifique sua conexão de internet.',
      });
    }

    if ([400, 500, 404].includes(onCreateEditPlantResponse.status || 0)) {
      showAlert({
        alertType: 'error',
        title: 'Algo deu errado. Tente novamente mais tarde',
      });
    }
  }, [onCreateEditPlantResponse, handleBackPress, showAlert]);

  return (
    <Container>
      <ScrollView>
        <Header
          title={plant ? 'Editar Planta' : 'Cadastrar Planta'}
          LeftComponent={
            <IconButton
              size={26}
              iconName="ios-arrow-back"
              onPress={handleBackPress}
            />
          }
        />
        <View bgColor="container.dark" style={styles.infoContainer}>
          <Text style={styles.sectionLabel}>Informações da planta</Text>
          <Text size="label" variant="label" style={styles.mapLabel}>
            Selecione a localização da planta:
          </Text>
          <View style={styles.mapContainer}>
            <MapView
              onPress={handleChangePlantLocation}
              style={styles.map}
              latitude={Number(plantData.latitude)}
              longitude={Number(plantData.longitude)}
              latitudeDelta={0.006}
              longitudeDelta={0.006}
              zoom={mapZoom}
            >
              <MarkerView
                latitude={Number(plantData.latitude)}
                longitude={Number(plantData.longitude)}
                key="id-1"
                isUserLocation
              />
            </MapView>
          </View>
          <TextInput
            onBlur={() => handleOnBlur('description')}
            onChangeText={(text) =>
              handleChangePlantValue({ field: 'description', value: text })
            }
            placeholder="Breve descrição da planta"
            label="Descrição:"
            value={plantData?.description}
            error={errors.description}
          />
          <Selector
            error={errors.specie_id}
            style={styles.specieSelector}
            createNewOptionLabel="Criar nova espécie"
            onCreateNewOption={handleCreateNewSpecie}
            placeholder="Espécie"
            label="Espécie:"
            value={selectedSpecie}
            options={specieNames}
            onSelect={handleSelectSpecie}
            onClose={onCloseSelector}
            onOpen={onOpenSelector}
            show={showSelector}
            searchable
          />
          <Text size="label" variant="label" style={styles.mapLabel}>
            Selecione imagens da planta (opcional):
          </Text>
          <ImageCarousel
            onDeleteImagePress={handleImageDeleted}
            style={styles.imageCarousel}
            canAdd={canAddImages}
            onAddImagePress={onAddImagePress}
            images={selectedImages}
          />
        </View>
        <Button
          isLoading={isCreateEditPlantLoading}
          onPress={onSubmitPress}
          style={styles.createEditButton}
          title={plant ? 'EDITAR PLANTA' : 'CADASTRAR PLANTA'}
        />
      </ScrollView>
      <ImagePicker
        selectionLimit={MAX_IMAGES - selectedImages.length}
        open={showImagePicker}
        onCancel={handleCancelImagePicker}
        onImageSelected={handleImageSelected}
        onError={handleImagePickerError}
      />
    </Container>
  );
};

export default CreateEditPlant;
