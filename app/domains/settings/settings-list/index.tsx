import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { useAuthStore } from '~/store/auth-store';

const Settings = () => {
  const signOut = useAuthStore((state) => state.signOut);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <SafeAreaView>
      <Button onPress={handleSignOut} title="Sair" />
    </SafeAreaView>
  );
};

export default Settings;
