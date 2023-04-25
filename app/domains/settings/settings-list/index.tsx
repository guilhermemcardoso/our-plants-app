import React, { useCallback, useMemo, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { FlatList, Switch } from 'native-base';
import { useSignOut } from '~/hooks/use-sign-out';
import { Container, ConfirmationModal } from '~/shared/components';
import { SettingsItem } from './components';
import styles from './styles';
import Header from '~/shared/components/header';
import { useSettings } from '~/hooks/use-settings';
import { Theme } from '~/types/theme';

interface Item {
  title: string;
  value?: boolean;
  setValue: (value: boolean) => void;
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
    ];
  }, [
    notificationEnabled,
    soundEnabled,
    theme,
    onSetTheme,
    setNotificationEnabled,
    setSoundEnabled,
  ]);

  const handleSignOut = () => {
    setShowSignOutModal(true);
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
        title={item.title}
        RightComponent={
          <Switch
            onTrackColor="primary.pure"
            value={item.value}
            onToggle={item.setValue}
          />
        }
      />
    );
  };

  return (
    <Container>
      <Header title="Configurações" />
      <FlatList
        style={styles.list}
        renderItem={onRenderItem}
        data={settings}
        ListFooterComponent={
          <SettingsItem title="Sair" onPress={handleSignOut} pressable />
        }
      />
      <ConfirmationModal
        open={showSignOutModal}
        noLabel="Cancelar"
        yesLabel="Sair"
        title="Sair"
        description="Tem certeza que você deseja sair do aplicativo?"
        onNo={onCancelSignOut}
        onYes={onConfirmSignOut}
      />
    </Container>
  );
};

export default Settings;
