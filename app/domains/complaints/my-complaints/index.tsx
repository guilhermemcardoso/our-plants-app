import React, { useEffect, useMemo, useState } from 'react';
import { Container, Header, IconButton, Text } from '~/shared/components';
import styles from './styles';
import { FlatList, Switch, View } from 'native-base';
import { ListRenderItem } from 'react-native';
import { Complaint } from '~/shared/types';
import { EmptyList, ComplaintItem } from '../components';
import { useComplaintsStore } from '~/store/complaints-store';
import { useGetMyComplaints } from '~/hooks/use-get-my-complaints';
import { useLoading } from '~/hooks/use-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.MY_COMPLAINTS
>;

const MyComplaints = ({ navigation }: Props) => {
  const [showClosed, setShowClosed] = useState(false);
  const myComplaints = useComplaintsStore((state) => state.myComplaints);
  const hasNextMyComplaints = useComplaintsStore(
    (state) => state.hasNextMyComplaints
  );
  const { setLoading } = useLoading();

  const { isLoading: isGetComplaintsLoading, getMyComplaints } =
    useGetMyComplaints();

  const isLoading = useMemo(() => {
    return isGetComplaintsLoading;
  }, [isGetComplaintsLoading]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const onSwitchClosed = (closed: boolean) => {
    setShowClosed(closed);
    getMyComplaints(closed);
  };

  const onPressItem = (item: Complaint) => {
    navigation.navigate(Routes.CREATE_EDIT_COMPLAINT, { complaint: item });
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const onRenderItem: ListRenderItem<Complaint> = ({
    item,
  }: {
    item: Complaint;
  }) => {
    return <ComplaintItem onPress={onPressItem} data={item} />;
  };

  return (
    <Container>
      <Header
        title="Denúncias"
        LeftComponent={
          <IconButton
            size={26}
            iconName="ios-arrow-back"
            onPress={handleBackPress}
          />
        }
        RightComponent={
          <>
            <Text>Encerradas</Text>
            <Switch
              ml="2"
              size="sm"
              onTrackColor="primary.pure"
              value={showClosed}
              onToggle={onSwitchClosed}
            />
          </>
        }
      />
      <View style={styles.mainContainer}>
        <FlatList
          renderItem={onRenderItem}
          data={myComplaints}
          ListEmptyComponent={<EmptyList />}
          ListFooterComponent={
            hasNextMyComplaints ? <Text>Carregar mais</Text> : null
          }
        />
      </View>
    </Container>
  );
};

export default MyComplaints;
