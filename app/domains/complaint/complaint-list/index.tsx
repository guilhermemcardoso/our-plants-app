import React, { useEffect, useMemo, useState } from 'react';
import { Container, Header, LoadMore, Text } from '~/shared/components';
import styles from './styles';
import { FlatList, Switch, View } from 'native-base';
import { ListRenderItem } from 'react-native';
import { Complaint } from '~/shared/types';
import { EmptyList, ComplaintItem } from '../components';
import { useComplaintStore } from '~/store/complaint-store';
import { useGetComplaints } from '~/hooks/use-get-complaints';
import { useLoading } from '~/hooks/use-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';

type Props = NativeStackScreenProps<SignedInStackParamList, Routes.COMPLAINTS>;

const Complaints = ({ navigation }: Props) => {
  const [showClosed, setShowClosed] = useState(false);
  const complaints = useComplaintStore((state) => state.complaints);
  const hasNextComplaints = useComplaintStore(
    (state) => state.hasNextComplaints
  );
  const { setLoading } = useLoading();

  const {
    isLoading: isGetComplaintsLoading,
    getComplaints,
    loadMoreComplaints,
  } = useGetComplaints();

  const isLoading = useMemo(() => {
    return isGetComplaintsLoading;
  }, [isGetComplaintsLoading]);

  const onPressItem = (item: Complaint) => {
    navigation.navigate(Routes.EVALUATE_COMPLAINT, { complaint: item });
  };

  const onSwitchClosed = (closed: boolean) => {
    setShowClosed(closed);
    getComplaints(closed);
  };

  const loadMore = () => {
    loadMoreComplaints(showClosed);
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
          data={complaints}
          ListEmptyComponent={<EmptyList />}
          ListFooterComponent={
            hasNextComplaints ? <LoadMore onPress={loadMore} /> : null
          }
        />
      </View>
    </Container>
  );
};

export default Complaints;
