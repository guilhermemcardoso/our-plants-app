import { FlatList, Image, View } from 'native-base';
import React from 'react';
import { ListRenderItem, ViewProps } from 'react-native';
import { AddImageCard, DeleteBadge } from '..';
import styles from './styles';
import { Image as ImageType } from '~/types/image';

type Props = ViewProps & {
  images: ImageType[];
  canAdd?: boolean;
  onAddImagePress: () => void;
  onDeleteImagePress?: (image: ImageType) => void;
};

export default function ImageCarousel({
  images,
  canAdd = true,
  onAddImagePress,
  onDeleteImagePress,
  ...rest
}: Props) {
  const renderItem: ListRenderItem<ImageType> = ({
    item,
  }: {
    item: ImageType;
  }) => {
    const onDeletePress = () => {
      if (onDeleteImagePress) {
        onDeleteImagePress(item);
      }
    };

    return (
      <View style={styles.imageItemContainer}>
        <Image
          style={styles.imageItem}
          source={{ uri: typeof item === 'string' ? item : item.uri }}
          alt="Image selecionada para cadastrar nova planta"
        />
        {onDeleteImagePress && <DeleteBadge onPress={onDeletePress} />}
      </View>
    );
  };

  const renderFooter = () => {
    if (!canAdd) {
      return;
    }
    return <AddImageCard onPress={onAddImagePress} />;
  };

  return (
    <View {...rest}>
      <FlatList
        contentContainerStyle={styles.list}
        horizontal
        data={images}
        renderItem={renderItem}
        ListFooterComponent={renderFooter()}
      />
    </View>
  );
}
