import { HStack, ScrollView, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
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

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.EDIT_PROFILE
>;

const EditProfile = ({ navigation }: Props) => {
  const [selectedStateOrProvince, setSelectedStateOrProvince] = useState('');
  const currentUser = useAuthStore((state) => state.currentUser);

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleEditProfile = () => {};

  const handleSelectStateOrProvince = (selected: string) => {
    setSelectedStateOrProvince(selected);
  };

  useEffect(() => {
    setSelectedStateOrProvince(currentUser?.address.state_or_province || '');
  }, [currentUser]);

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
              style={styles.removePictureButton}
              variant="outline"
              title="REMOVER FOTO"
              onPress={() => {}}
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
    </Container>
  );
};

export default EditProfile;
