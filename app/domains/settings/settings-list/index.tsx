import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { useSignOut } from '~/hooks/use-sign-out';

const Settings = () => {
  const { signOut } = useSignOut();

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
