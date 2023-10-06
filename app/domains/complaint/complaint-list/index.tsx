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
import { useAlert } from '~/hooks/use-alert';

type Props = NativeStackScreenProps<SignedInStackParamList, Routes.COMPLAINTS>;

const Complaints = ({ navigation }: Props) => {
  const [showClosed, setShowClosed] = useState(false);
  const complaints = useComplaintStore((state) => state.complaints);
  const hasNextComplaints = useComplaintStore(
    (state) => state.hasNextComplaints
  );
  const { setLoading } = useLoading();

  const {
    onResponse,
    isLoading: isGetComplaintsLoading,
    getComplaints,
    loadMoreComplaints,
  } = useGetComplaints();
  const { showAlert } = useAlert();

  const filteredComplaints = useMemo(() => {
    if (showClosed) {
      return complaints;
    }

    return complaints.filter((complaint) => !complaint.closed);
  }, [complaints, showClosed]);

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

  const onRenderItem: ListRenderItem<Complaint> = ({
    item,
  }: {
    item: Complaint;
  }) => {
    return <ComplaintItem onPress={onPressItem} data={item} />;
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (onResponse.status === 503) {
      showAlert({
        alertType: 'error',
        title: 'Serviço indisponível, verifique sua conexão de internet.',
      });
    }

    if ([400, 500].includes(onResponse.status || 0)) {
      showAlert({
        alertType: 'error',
        title: 'Algo deu errado.',
      });
    }
  }, [onResponse, showAlert]);

  return (
    <Container>
      <Header title="Denúncias" />
      <View style={styles.mainContainer}>
        <View style={styles.closedContainer}>
          <Text>Encerradas</Text>
          <Switch
            ml="2"
            size="sm"
            onTrackColor="primary.pure"
            value={showClosed}
            onToggle={onSwitchClosed}
          />
        </View>
        <FlatList
          renderItem={onRenderItem}
          data={filteredComplaints}
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
