import { HStack, ScrollView, VStack, View } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  ConfirmationModal,
  Container,
  Header,
  IconButton,
  Selector,
  Text,
  TextInput,
} from '~/shared/components';
import styles from './styles';
import { useAuthStore } from '~/store/auth-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { useRemoveProfileImage } from '~/hooks/use-remove-profile-image';
import { useLoading } from '~/hooks/use-loading';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.EDIT_PROFILE
>;

const EditProfile = ({ navigation }: Props) => {
  const { isLoading: isRemoveProfileImageLoading, removeProfileImage } =
    useRemoveProfileImage();
  const { setLoading } = useLoading();
  const [selectedStateOrProvince, setSelectedStateOrProvince] = useState('');
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);

  const isLoading = useMemo(() => {
    return isRemoveProfileImageLoading;
  }, [isRemoveProfileImageLoading]);

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleEditProfile = () => {};

  const handleSelectStateOrProvince = (selected: string) => {
    setSelectedStateOrProvince(selected);
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

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setSelectedStateOrProvince(currentUser?.address.state_or_province || '');
  }, [currentUser?.address.state_or_province]);

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
          <Avatar level={25} avatarUrl={currentUser?.profile_image} />
          <VStack flex={1} ml={8}>
            <Button title="ALTERAR FOTO" onPress={() => {}} />
            <Button
              style={styles.removeImageButton}
              variant="outline"
              title="REMOVER FOTO"
              isDisabled={!currentUser?.profile_image}
              onPress={handleRemoveImagePress}
            />
          </VStack>
        </View>
        <View bgColor="container.dark" style={styles.profileContainer}>
          <Button title="TROCAR SENHA" />
        </View>
        <View bgColor="container.dark" style={styles.profileContainer}>
          <Text style={styles.sectionLabel}>Informações pessoais</Text>
          <TextInput
            label="Email"
            value={currentUser?.email}
            isDisabled={true}
          />
          <TextInput label="Nome" value={currentUser?.name} />
          <TextInput label="Sobrenome" value={currentUser?.lastname} />
          <TextInput label="Bio" value={currentUser?.bio} />
        </View>
        <View bgColor="container.dark" style={styles.profileContainer}>
          <Text style={styles.sectionLabel}>Endereço</Text>
          <HStack>
            <TextInput
              style={styles.leftInput}
              label="Rua"
              value={currentUser?.address.street_name}
            />
            <TextInput
              style={styles.rightInput}
              label="Número"
              value={currentUser?.address.house_number}
            />
          </HStack>
          <TextInput
            label="Bairro"
            value={currentUser?.address.neighbourhood}
          />
          <HStack alignItems="center">
            <TextInput
              style={styles.leftInput}
              label="Cidade"
              value={currentUser?.address.city}
            />
            <Selector
              label="Estado"
              style={styles.rightInput}
              value={selectedStateOrProvince}
              options={['SP', 'RJ', 'BA', 'MG']}
              onSelect={handleSelectStateOrProvince}
            />
          </HStack>
          <HStack>
            <TextInput
              style={styles.leftInput}
              label="CEP"
              value={currentUser?.address.zip_code}
            />
            <TextInput
              style={styles.rightInput}
              isDisabled
              label="País"
              value={currentUser?.address.country}
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
    </Container>
  );
};

export default EditProfile;
