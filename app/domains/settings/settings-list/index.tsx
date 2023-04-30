import React, { useCallback, useMemo, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { FlatList, Switch, View } from 'native-base';
import { useSignOut } from '~/hooks/use-sign-out';
import { Container, ConfirmationModal, InfoModal } from '~/shared/components';
import { AboutDescription, SettingsItem } from './components';
import styles from './styles';
import Header from '~/shared/components/header';
import { useSettings } from '~/hooks/use-settings';
import { Theme } from '~/types/theme';

interface Item {
  title: string;
  value?: boolean;
  setValue?: (value: boolean) => void;
  onPress?: () => void;
}

const Settings = () => {
  const { signOut } = useSignOut();
  const {
    theme,
    setTheme,
    notificationEnabled,
    setNotificationEnabled,
    soundEnabled,
    setSoundEnabled,
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

  const settings: Item[] = useMemo(() => {
    return [
      {
        title: 'Tema escuro',
        value: theme === 'dark' ? true : false,
        setValue: onSetTheme,
      },
      {
        title: 'Notificações habilitadas',
        value: notificationEnabled,
        setValue: setNotificationEnabled,
      },
      {
        title: 'Sons habilitados',
        value: soundEnabled,
        setValue: setSoundEnabled,
      },
      {
        title: 'Sobre',
        onPress: onOpenAboutModal,
      },
      {
        title: 'Sair',
        onPress: handleSignOut,
      },
    ];
  }, [
    notificationEnabled,
    soundEnabled,
    theme,
    onSetTheme,
    setNotificationEnabled,
    setSoundEnabled,
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
    const getRightComponent = () => {
      if (item.value !== undefined) {
        return (
          <Switch
            onTrackColor="primary.pure"
            value={item.value}
            onToggle={item.setValue}
          />
        );
      }
    };

    console.log('ITEM', item);
    return (
      <SettingsItem
        onPress={item.onPress}
        title={item.title}
        pressable={!item.value}
        RightComponent={getRightComponent()}
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
