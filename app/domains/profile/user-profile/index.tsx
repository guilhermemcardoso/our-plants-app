import { Divider, View, useTheme } from 'native-base';
import React, { useEffect, useMemo } from 'react';
import {
  Avatar,
  Button,
  Card,
  Container,
  Header,
  IconButton,
  ProgressBar,
  Text,
} from '~/shared/components';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthStore } from '~/store/auth-store';
import { useGetCurrentUser } from '~/hooks/use-get-current-user';
import { useLoading } from '~/hooks/use-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.USER_PROFILE
>;

const UserProfile = ({ navigation }: Props) => {
  const theme = useTheme();
  const currentUser = useAuthStore((state) => state.currentUser);
  const { setLoading } = useLoading();
  const { getCurrentUser, isLoading } = useGetCurrentUser();

  const handleEditProfile = () => {
    navigation.navigate(Routes.EDIT_PROFILE);
  };
  const handleGetCurrentUser = () => {
    getCurrentUser();
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const showAddress = useMemo(() => {
    return (
      currentUser?.address &&
      (currentUser.address.city ||
        currentUser.address.country ||
        currentUser.address.house_number ||
        currentUser.address.neighbourhood ||
        currentUser.address.state_or_province ||
        currentUser.address.street_name ||
        currentUser.address.zip_code)
    );
  }, [currentUser]);

  const renderDetails = () => {
    if (!currentUser?.bio && !showAddress) {
      return null;
    }

    return (
      <View bgColor="container.dark" style={styles.profileContainer}>
        {currentUser?.bio && (
          <>
            <Text style={styles.fieldLabel} variant="secondary">
              Bio:
            </Text>
            <Text>{currentUser.bio}</Text>

            <Divider style={styles.divider} bgColor="divider.primary" />
          </>
        )}
        {showAddress && (
          <>
            <Text style={styles.fieldLabel} variant="secondary">
              Endereço:
            </Text>
            {(currentUser?.address.street_name ||
              currentUser?.address.house_number) && (
              <Text>{`${
                currentUser?.address.street_name
                  ? `${currentUser?.address.street_name}, `
                  : ''
              }${currentUser?.address.house_number || ''}`}</Text>
            )}
            {currentUser?.address.neighbourhood && (
              <Text>{`${currentUser?.address.neighbourhood}`}</Text>
            )}
            {currentUser?.address.zip_code && (
              <Text>CEP: {currentUser?.address.zip_code}</Text>
            )}
            {(currentUser?.address.city ||
              currentUser?.address.state_or_province) && (
              <Text>{`${currentUser.address.city || ''}${
                currentUser.address.city &&
                currentUser.address.state_or_province
                  ? ' - '
                  : ''
              }${currentUser.address.state_or_province || ''}`}</Text>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <Container>
      <Header
        title="Perfil de Usuário"
        RightComponent={
          <IconButton
            size={26}
            iconName="ios-refresh"
            onPress={handleGetCurrentUser}
          />
        }
      />
      <View bgColor="container.dark" style={styles.topContainer}>
        <Avatar level={25} avatarUrl={currentUser?.profile_image} />
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.name} size="subtitle">
            {`${currentUser?.name} ${currentUser?.lastname}`}
          </Text>
          <Text numberOfLines={1} style={styles.email}>
            {currentUser?.email}
          </Text>
          <ProgressBar
            currentXp={currentUser?.score.xp || 0}
            totalXp={currentUser?.score.xp_next_level || 0}
          />
          <Text
            variant="interactive"
            size="helper"
            numberOfLines={1}
            style={styles.mappedCount}
          >
            <Icon
              name={'ios-leaf'}
              size={20}
              color={theme.colors.font.interactive}
            />{' '}
            {currentUser?.mapped_plants}
          </Text>
        </View>
      </View>
      {!currentUser?.completed_profile && (
        <Card style={styles.infoCard}>
          <Text variant="secondary">
            Ser perfil não está completo. Preencha todas as informações do seu
            perfil e ganhe pontos.
          </Text>
        </Card>
      )}
      {renderDetails()}
      <Button
        onPress={handleEditProfile}
        style={styles.editButton}
        title="EDITAR PERFIL"
      />
    </Container>
  );
};

export default UserProfile;
