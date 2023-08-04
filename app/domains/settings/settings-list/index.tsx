import React, { useCallback, useMemo, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { FlatList, View } from 'native-base';
import { useSignOut } from '~/hooks/use-sign-out';
import { Container, ConfirmationModal, InfoModal } from '~/shared/components';
import { AboutDescription, SettingsItem } from './components';
import styles from './styles';
import Header from '~/shared/components/header';
import { useSettings } from '~/hooks/use-settings';
import { Theme } from '~/types/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';

interface Item {
  title: string;
  value?: boolean | number;
  type: 'default' | 'switch' | 'slider';
  setValue?: (value: any) => void;
  onPress?: () => void;
}

type Props = NativeStackScreenProps<SignedInStackParamList, Routes.SETTINGS>;

const Settings = ({ navigation }: Props) => {
  const { signOut } = useSignOut();
  const {
    theme,
    setTheme,
    notificationEnabled,
    setNotificationEnabled,
    soundEnabled,
    setSoundEnabled,
    distance,
    setDistance,
  } = useSettings();

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const onSetTheme = useCallback(
    (value: boolean) => {
      let newTheme: Theme = 'dark';
      if (!value) {
        newTheme = 'light';
      }

      setTheme(newTheme);
    },
    [setTheme]
  );

  const onOpenAboutModal = useCallback(() => {
    setShowAboutModal(true);
  }, []);

  const handleSignOut = useCallback(() => {
    setShowSignOutModal(true);
  }, []);

  const onOpenMyComplaints = useCallback(() => {
    navigation.navigate(Routes.MY_COMPLAINTS);
  }, [navigation]);

  const settings: Item[] = useMemo(() => {
    return [
      {
        title: 'Tema escuro',
        value: theme === 'dark' ? true : false,
        type: 'switch',
        setValue: onSetTheme,
      },
      {
        title: 'Notificações habilitadas',
        value: notificationEnabled,
        type: 'switch',
        setValue: setNotificationEnabled,
      },
      {
        title: 'Sons habilitados',
        value: soundEnabled,
        type: 'switch',
        setValue: setSoundEnabled,
      },
      {
        title: 'Distância máxima',
        value: distance,
        type: 'slider',
        setValue: setDistance,
      },
      {
        title: 'Minhas denúncias',
        type: 'default',
        onPress: onOpenMyComplaints,
      },
      {
        title: 'Sobre',
        type: 'default',
        onPress: onOpenAboutModal,
      },
      {
        title: 'Sair',
        type: 'default',
        onPress: handleSignOut,
      },
    ];
  }, [
    notificationEnabled,
    soundEnabled,
    theme,
    distance,
    setDistance,
    onSetTheme,
    setNotificationEnabled,
    setSoundEnabled,
    onOpenMyComplaints,
    onOpenAboutModal,
    handleSignOut,
  ]);

  const onCloseAboutModal = () => {
    setShowAboutModal(false);
  };

  const onCancelSignOut = () => {
    setShowSignOutModal(false);
  };

  const onConfirmSignOut = () => {
    setShowSignOutModal(false);
    signOut();
  };

  const onRenderItem: ListRenderItem<Item> = ({ item }: { item: Item }) => {
    return (
      <SettingsItem
        onPress={item.onPress}
        setValue={item.setValue}
        title={item.title}
        pressable={!item.value}
        type={item.type}
        value={item.value}
      />
    );
  };

  return (
    <Container>
      <Header title="Configurações" />
      <View bgColor="container.dark" style={styles.listContainer}>
        <FlatList renderItem={onRenderItem} data={settings} />
      </View>
      <ConfirmationModal
        open={showSignOutModal}
        noLabel="CANCELAR"
        yesLabel="SAIR"
        title="Sair"
        description="Tem certeza que você deseja sair do aplicativo?"
        onNo={onCancelSignOut}
        onYes={onConfirmSignOut}
      />
      <InfoModal
        open={showAboutModal}
        buttonLabel="ENTENDI"
        title="Sobre"
        onPress={onCloseAboutModal}
      >
        <AboutDescription />
      </InfoModal>
    </Container>
  );
};

export default Settings;
