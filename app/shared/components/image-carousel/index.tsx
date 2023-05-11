import { FlatList, Image, View } from 'native-base';
import React from 'react';
import { ListRenderItem, ViewProps } from 'react-native';
import { AddImageCard, DeleteBadge } from '..';
import styles from './styles';
import { Asset } from 'react-native-image-picker';

type Props = ViewProps & {
  images: Asset[];
  canAdd?: boolean;
  onAddImagePress: () => void;
  onDeleteImagePress?: (image: Asset) => void;
};

export default function ImageCarousel({
  images,
  canAdd = true,
  onAddImagePress,
  onDeleteImagePress,
  ...rest
}: Props) {
  const renderItem: ListRenderItem<Asset> = ({ item }: { item: Asset }) => {
    const onDeletePress = () => {
      if (onDeleteImagePress) {
        onDeleteImagePress(item);
      }
    };

    return (
      <View style={styles.imageItemContainer}>
        <Image
          style={styles.imageItem}
          source={{ uri: item.uri }}
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
