import React from 'react';
import { Actionsheet, View, useTheme } from 'native-base';
import Text from '../text';
import { IconButton } from '..';
import styles from './styles';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

interface Props {
  open: boolean;
  onCancel: () => void;
  onError: (error: string) => void;
  onImageSelected: (images: Asset[]) => void;
  selectionLimit?: number;
}

export default function ImagePicker({
  open,
  selectionLimit = 1,
  onCancel,
  onImageSelected,
  onError,
}: Props) {
  const theme = useTheme();

  const onCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        maxHeight: 300,
        maxWidth: 300,
      });

      if (result.didCancel) {
        onCancel();
        return;
      }

      if (result.errorCode) {
        onError('Câmera indisponível');
        return;
      }

      if (result.assets) {
        onImageSelected(result.assets);
      }
    } catch (error) {
      onError('Câmera indisponível');
    }
  };

  const onGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxHeight: 300,
        maxWidth: 300,
        selectionLimit,
      });

      if (result.didCancel) {
        onCancel();
        return;
      }

      if (result.errorCode) {
        onError('Galera de imagens indisponível');
        return;
      }

      if (result.assets) {
        onImageSelected(result.assets);
      }
    } catch (error) {
      onError('Galera de imagens indisponível');
    }
  };

  return (
    <Actionsheet isOpen={open} onClose={onCancel}>
      <Actionsheet.Content bgColor={theme.colors.container.light}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <IconButton
              onPress={onCamera}
              iconName="ios-camera-outline"
              size={56}
            />
            <Text size="subtitle">Câmera</Text>
          </View>
          <View style={styles.button}>
            <IconButton
              onPress={onGallery}
              iconName="ios-images-outline"
              size={56}
            />
            <Text size="subtitle">Galeria</Text>
          </View>
        </View>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
