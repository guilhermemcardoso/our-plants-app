import React, { useEffect, useMemo, useState } from 'react';
import { HStack, ScrollView, VStack, View } from 'native-base';
import { Masks, formatWithMask } from 'react-native-mask-input';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  Avatar,
  Button,
  ConfirmationModal,
  Container,
  Header,
  IconButton,
  ImagePicker,
  Selector,
  Text,
  TextInput,
} from '~/shared/components';
import { Asset } from 'react-native-image-picker';
import { useLoading } from '~/hooks/use-loading';
import { useRemoveProfileImage } from '~/hooks/use-remove-profile-image';
import { useUpdateUserProfile } from '~/hooks/use-update-user-profile';
import { useUpdateProfileImage } from '~/hooks/use-update-profile-image';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { brazillianStates } from '~/shared/constants/brazillian_states';
import { Address, User } from '~/shared/types';
import { useAuthStore } from '~/store/auth-store';
import {
  EditProfileValidationErrors,
  getErrorByField,
  validate,
} from './validations';
import styles from './styles';
import { ChangePasswordData } from '~/shared/components/modal/change-password/types';
import { ChangePasswordModal } from '~/shared/components/modal';
import { useChangePassword } from '~/hooks/use-change-password';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.EDIT_PROFILE
>;

const EditProfile = ({ navigation }: Props) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const {
    isLoading: isChangePasswordLoading,
    changePassword,
    onResponse: onChangePasswordResponse,
  } = useChangePassword();
  const {
    isLoading: isUpdateProfileImageLoading,
    updateProfileImage,
    onResponse: onUpdateProfileImageResponse,
  } = useUpdateProfileImage();
  const {
    isLoading: isRemoveProfileImageLoading,
    removeProfileImage,
    onResponse: onRemoveProfileImageResponse,
  } = useRemoveProfileImage();
  const {
    isLoading: isUpdateUserProfileLoading,
    updateUserProfile,
    onResponse: onUpdateUserProfileResponse,
  } = useUpdateUserProfile();
  const { setLoading } = useLoading();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);
  const [showConfirmImageSelectedModal, setShowConfirmImageSelectedModal] =
    useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');
  const [alertMessage, setAlertMessage] = useState('');
  const [errors, setErrors] = useState<EditProfileValidationErrors>({
    _id: '',
    email: '',
    name: '',
    lastname: '',
  });
  const [userData, setUserData] = useState<User | null>();
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);

  const isLoading = useMemo(() => {
    return (
      isRemoveProfileImageLoading ||
      isUpdateUserProfileLoading ||
      isUpdateProfileImageLoading ||
      isChangePasswordLoading
    );
  }, [
    isRemoveProfileImageLoading,
    isUpdateUserProfileLoading,
    isUpdateProfileImageLoading,
    isChangePasswordLoading,
  ]);

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleEditProfile = () => {
    if (!userData) {
      return;
    }

    const validation = validate(userData);
    if (!validation.success) {
      const errorsByField: EditProfileValidationErrors = {
        _id: '',
        email: '',
        name: '',
        lastname: '',
      };
      Object.keys(errorsByField).forEach((field) => {
        const error = getErrorByField(
          validation.error,
          field as keyof EditProfileValidationErrors
        );
        errorsByField[field as keyof EditProfileValidationErrors] = error;
      });
      setErrors(errorsByField);
      return;
    }
    updateUserProfile({
      ...userData,
      address: { ...userData.address, country: 'Brasil' },
    });
  };

  const handleSelectStateOrProvince = (selected: string) => {
    if (!userData) {
      return;
    }
    const newUserData = { ...userData };

    newUserData.address = {
      ...newUserData.address,
      state_or_province: selected,
    };

    setUserData(newUserData);
  };

  const handleUpdateImagePress = async () => {
    setShowImagePicker(true);
  };

  const handleRemoveImagePress = () => {
    setShowRemoveImageModal(true);
  };

  const onCancelRemoveImage = () => {
    setShowRemoveImageModal(false);
  };

  const onConfirmRemoveImage = () => {
    setShowRemoveImageModal(false);
    removeProfileImage();
    setLoading(true);
  };

  const handleChangeAddressValue = ({
    field,
    value,
  }: {
    field: keyof Address;
    value: string;
  }) => {
    if (!userData) {
      return;
    }
    const newUserData = { ...userData };

    newUserData.address = {
      ...newUserData.address,
      [field]: value,
    };

    setUserData(newUserData);
  };

  const handleChangeUserValue = ({
    field,
    value,
  }: {
    field: 'bio' | 'name' | 'lastname';
    value: string;
  }) => {
    if (!userData) {
      return;
    }
    const newUserData = { ...userData };

    newUserData[field] = value;

    setUserData(newUserData);
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCancelImagePicker = () => {
    setShowImagePicker(false);
  };

  const handleImageSelected = (images: Asset[]) => {
    setShowImagePicker(false);
    if (images.length === 0) {
      return;
    }

    setShowConfirmImageSelectedModal(true);
    setSelectedImage(images[0]);
  };

  const onCancelUpdateImage = () => {
    setShowConfirmImageSelectedModal(false);
  };

  const onConfirmUpdateImage = async () => {
    setShowConfirmImageSelectedModal(false);
    if (selectedImage && selectedImage.uri) {
      await updateProfileImage(selectedImage.uri);
      if (!userData) {
        return;
      }
      const newUserData = { ...userData };
      if (currentUser && currentUser?.profile_image) {
        newUserData.profile_image = currentUser?.profile_image;
        setUserData(userData);
      }
    }
  };

  const handleImagePickerError = (error: string) => {
    setShowImagePicker(false);
    setAlertMessage(error);
    setShowAlert(true);
  };

  const onChangePasswordPress = () => {
    setShowChangePasswordModal(true);
  };

  const onCancelChangePassword = () => {
    setShowChangePasswordModal(false);
  };

  const onConfirmChangePassword = (data: ChangePasswordData) => {
    setShowChangePasswordModal(false);
    changePassword(data.current, data.password);
  };

  const onCloseSelector = () => {
    setShowSelector(false);
  };

  const onOpenSelector = () => {
    setShowSelector(true);
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (currentUser) {
      const updatedUserData: User = {
        ...currentUser,
        address: { ...currentUser?.address, country: 'Brasil' },
      };
      setUserData(updatedUserData);
    }
  }, [currentUser]);

  useEffect(() => {
    if (
      onUpdateUserProfileResponse.status === 400 ||
      onRemoveProfileImageResponse.status === 400 ||
      onUpdateProfileImageResponse.status === 400 ||
      onChangePasswordResponse.status === 400
    ) {
      setAlertMessage('Algo deu errado.');
      setAlertType('error');
      setShowAlert(true);
    }

    if (
      onUpdateUserProfileResponse.status === 200 ||
      onRemoveProfileImageResponse.status === 200 ||
      onUpdateProfileImageResponse.status === 200 ||
      onChangePasswordResponse.status === 200
    ) {
      setAlertMessage('Perfil atualizado com sucesso.');
      setAlertType('success');
      setShowAlert(true);
    }
  }, [
    onUpdateUserProfileResponse,
    onRemoveProfileImageResponse,
    onUpdateProfileImageResponse,
    onChangePasswordResponse,
  ]);

  return (
    <Container safe={false}>
      <ScrollView>
        <Header
          title="Perfil de Usuário"
          LeftComponent={
            <IconButton
              size={26}
              iconName="ios-arrow-back"
              onPress={handleBackPress}
            />
          }
        />
        <View bgColor="container.dark" style={styles.topContainer}>
          <Avatar level={25} avatarUrl={userData?.profile_image} />
          <VStack flex={1} ml={8}>
            <Button title="ALTERAR FOTO" onPress={handleUpdateImagePress} />
            <Button
              style={styles.removeImageButton}
              variant="outline"
              title="REMOVER FOTO"
              isDisabled={!userData?.profile_image}
              onPress={handleRemoveImagePress}
            />
          </VStack>
        </View>
        <View bgColor="container.dark" style={styles.profileContainer}>
          <Button title="TROCAR SENHA" onPress={onChangePasswordPress} />
        </View>
        <View bgColor="container.dark" style={styles.profileContainer}>
          <Text style={styles.sectionLabel}>Informações pessoais</Text>
          <TextInput label="Email" value={userData?.email} isDisabled={true} />
          <TextInput
            onChangeText={(text) =>
              handleChangeUserValue({ field: 'name', value: text })
            }
            label="Nome"
            value={userData?.name}
            error={errors.name}
          />
          <TextInput
            onChangeText={(text) =>
              handleChangeUserValue({ field: 'lastname', value: text })
            }
            label="Sobrenome"
            value={userData?.lastname}
            error={errors.lastname}
          />
          <TextInput
            onChangeText={(text) =>
              handleChangeUserValue({ field: 'bio', value: text })
            }
            label="Bio"
            value={userData?.bio}
          />
        </View>
        <View bgColor="container.dark" style={styles.profileContainer}>
          <Text style={styles.sectionLabel}>Endereço</Text>
          <HStack>
            <TextInput
              onChangeText={(text) =>
                handleChangeAddressValue({
                  field: 'street_name',
                  value: text,
                })
              }
              style={styles.leftInput}
              label="Rua"
              value={userData?.address?.street_name}
            />
            <TextInput
              onChangeText={(text) =>
                handleChangeAddressValue({
                  field: 'house_number',
                  value: text,
                })
              }
              style={styles.rightInput}
              label="Número"
              value={userData?.address?.house_number}
            />
          </HStack>
          <TextInput
            onChangeText={(text) =>
              handleChangeAddressValue({
                field: 'neighbourhood',
                value: text,
              })
            }
            label="Bairro"
            value={userData?.address?.neighbourhood}
          />
          <HStack alignItems="center">
            <TextInput
              onChangeText={(text) =>
                handleChangeAddressValue({
                  field: 'city',
                  value: text,
                })
              }
              style={styles.leftInput}
              label="Cidade"
              value={userData?.address?.city}
            />
            <Selector
              onClose={onCloseSelector}
              onOpen={onOpenSelector}
              show={showSelector}
              label="Estado"
              style={styles.rightInput}
              value={userData?.address?.state_or_province || ''}
              options={brazillianStates}
              onSelect={handleSelectStateOrProvince}
            />
          </HStack>
          <HStack>
            <TextInput
              onChangeText={(text) =>
                handleChangeAddressValue({
                  field: 'zip_code',
                  value: text,
                })
              }
              style={styles.leftInput}
              label="CEP"
              value={
                userData?.address?.zip_code
                  ? formatWithMask({
                      text: userData?.address?.zip_code,
                      mask: Masks.ZIP_CODE,
                    }).masked
                  : ''
              }
            />
            <TextInput
              style={styles.rightInput}
              isDisabled
              label="País"
              value={userData?.address?.country}
            />
          </HStack>
        </View>
        <Button
          onPress={handleEditProfile}
          style={styles.editButton}
          title="EDITAR PERFIL"
        />
      </ScrollView>
      <ConfirmationModal
        open={showRemoveImageModal}
        title="Remover foto"
        description="Tem certeza de que deseja remover sua foto de perfil?"
        noLabel="CANCELAR"
        yesLabel="REMOVER"
        onNo={onCancelRemoveImage}
        onYes={onConfirmRemoveImage}
      />
      <ConfirmationModal
        open={showConfirmImageSelectedModal}
        title="Confirma foto"
        description="Tem certeza de que deseja enviar a foto selecionada?"
        noLabel="CANCELAR"
        yesLabel="ENVIAR"
        onNo={onCancelUpdateImage}
        onYes={onConfirmUpdateImage}
        yesButtonWarning={false}
      />
      <ChangePasswordModal
        open={showChangePasswordModal}
        noLabel="CANCELAR"
        yesLabel="TROCAR"
        onNo={onCancelChangePassword}
        onYes={onConfirmChangePassword}
        yesButtonWarning={false}
      />
      <Alert
        show={showAlert}
        status={alertType}
        title={alertMessage}
        onClose={onCloseAlert}
      />
      <ImagePicker
        open={showImagePicker}
        onCancel={handleCancelImagePicker}
        onImageSelected={handleImageSelected}
        onError={handleImagePickerError}
      />
    </Container>
  );
};

export default EditProfile;
