import React, { useEffect, useMemo, useState } from 'react';
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
import {
  formatSpecieIconName,
  getPlantIconBySpecie,
} from '~/shared/utils/icon';
import { Asset } from 'react-native-image-picker';
import { getErrorByField } from '../validations';
import { MAX_IMAGES } from '~/shared/constants/constants';
import { Location } from '~/shared/types';
import { useLocation } from '~/hooks/use-location';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.CREATE_EDIT_PLANT
>;

const CreateEditPlant = ({ route, navigation }: Props) => {
  const { plant } = route.params;
  const { currentLocation } = useLocation();
  const species = useSpecieStore((state) => state.species);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [canAddImages, setcanAddImages] = useState(false);
  const [selectedSpecie, setSelectedSpecie] = useState('');
  const [selectedImages, setSelectedImages] = useState<Asset[]>([]);
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

  const specieNames = useMemo(() => {
    return species.map((specie) => specie.popular_name);
  }, [species]);

  const handleBackPress = () => {
    navigation.goBack();
  };

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
    const specie = species.find((item) => item.popular_name === selected);

    if (specie) {
      setPlantData({ ...plantData, specie_id: specie._id });
      setSelectedSpecie(specie.popular_name);
      console.log('selectedSpecie', specie);
    }
  };

  const handleCreateNewSpecie = () => {
    console.log('CLICOU PRA CRIAR');
  };

  const handleCancelImagePicker = () => {
    setShowImagePicker(false);
  };

  const handleChangePlantLocation = (location: Location) => {
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

  const handleImageDeleted = (image: Asset) => {
    const imageUris: string[] = (plantData.images || []).filter(
      (item) => item !== image.uri
    );

    const newSelectedImages = [...selectedImages].filter(
      (item) => item.uri && imageUris.includes(item.uri)
    );

    setSelectedImages(newSelectedImages);
    setPlantData({ ...plantData, images: imageUris });
  };

  const handleImagePickerError = () => {};

  const onAddImagePress = () => {
    setShowImagePicker(true);
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

    // TODO create or edit plant
  };

  useEffect(() => {
    if (plant && plant.images) {
      setcanAddImages(plant.images.length < 3);
      return;
    }

    setcanAddImages(selectedImages.length < 3);
  }, [plant, selectedImages]);

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
            >
              <MarkerView
                latitude={Number(plantData.latitude)}
                longitude={Number(plantData.longitude)}
                id="id-1"
                icon={getPlantIconBySpecie(formatSpecieIconName('default'))}
              />
            </MapView>
          </View>
          <TextInput
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
          onPress={onSubmitPress}
          style={styles.createEditButton}
          title={plant ? 'EDITAR PLANTA' : 'CADASTRAR PLANTA'}
        />
      </ScrollView>
      {/*      
      <Alert
        show={showAlert}
        status={alertType}
        title={alertMessage}
        onClose={onCloseAlert}
      /> */}
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
