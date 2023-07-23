import React, { useState } from 'react';
import { Dimensions, ViewProps } from 'react-native';
import { Image, View, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dots, IconButton, Text } from '~/shared/components';
import styles from './styles';

type Props = ViewProps & {
  images: string[];
};

export default function Slideshow({ images, ...rest }: Props) {
  const theme = useTheme();
  const [position, setPosition] = useState(0);
  const { width } = Dimensions.get('screen');
  const height = width * 0.7;

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
      <View>
        {images.length > 0 ? (
          <Image
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
            style={styles.previousBtn}
            iconName="ios-chevron-back"
            size={48}
            onPress={onPreviousPress}
          />
          <IconButton
            style={styles.nextBtn}
            iconName="ios-chevron-forward"
            size={48}
            onPress={onNextPress}
          />
        </>
      )}
    </View>
  );
}
