import React, { useMemo, useState } from 'react';
import { Dimensions, ViewProps } from 'react-native';
import { Image, View, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dots, IconButton, Text } from '~/shared/components';
import styles from './styles';
import { useSettingsStore } from '~/store/settings-store';

type Props = ViewProps & {
  images: string[];
  borderRadius?: number;
};

export default function Slideshow({
  images,
  borderRadius = 0,
  ...rest
}: Props) {
  const themeMode = useSettingsStore((state) => state.theme);
  const theme = useTheme();
  const [position, setPosition] = useState(0);
  const { width } = Dimensions.get('screen');
  const height = width * 0.7;

  const shadowColor = useMemo(() => {
    const color = themeMode === 'dark' ? '#000' : '#fff';
    return { shadowColor: color };
  }, [themeMode]);

  const onPreviousPress = () => {
    const nextPosition = position <= 0 ? images.length - 1 : position - 1;
    setPosition(nextPosition);
  };

  const onNextPress = () => {
    const nextPosition = position >= images.length - 1 ? 0 : position + 1;
    setPosition(nextPosition);
  };

  const onDotPress = (index: number) => {
    setPosition(index);
  };

  return (
    <View {...rest}>
      <View borderRadius={borderRadius}>
        {images.length > 0 ? (
          <Image
            borderRadius={borderRadius}
            width={width}
            height={height}
            style={styles.imageItem}
            source={{ uri: images[position] }}
            alt="Image da planta selecionada"
          />
        ) : (
          <View
            bgColor={theme.colors.container.light}
            width={width}
            height={height}
            style={styles.noImageContainer}
          >
            <Icon
              name={'ios-camera'}
              size={height / 2}
              color={theme.colors.font.primary}
            />
            <Text size="subtitle">Imagem não disponível</Text>
          </View>
        )}
      </View>
      {images.length > 1 && (
        <>
          <Dots
            onDotPress={onDotPress}
            style={styles.dots}
            total={images.length}
            current={position}
          />
          <IconButton
            style={[styles.previousBtn, shadowColor]}
            iconName="ios-chevron-back"
            size={48}
            onPress={onPreviousPress}
          />
          <IconButton
            style={[styles.nextBtn, shadowColor]}
            iconName="ios-chevron-forward"
            size={48}
            onPress={onNextPress}
          />
        </>
      )}
    </View>
  );
}
