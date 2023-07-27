import React, { useEffect, useMemo, useState } from 'react';
import { Container, Header, IconButton } from '~/shared/components';
import styles from './styles';
import { FlatList, View } from 'native-base';
import { ListRenderItem } from 'react-native';
import { Complaint } from '~/shared/types';
import { EmptyList, ComplaintItem } from '../components';
import { useComplaintsStore } from '~/store/complaints-store';
import { useGetComplaints } from '~/hooks/use-get-complaints';
import { useLoading } from '~/hooks/use-loading';

const Complaints = () => {
  const [page, setPage] = useState(1);
  const [closedComplaint, setClosedComplaint] = useState(true);
  const [openedComplaint, setOpenedComplaint] = useState(true);
  const complaints = useComplaintsStore((state) => state.complaints);
  const { setLoading } = useLoading();

  const { isLoading: isGetComplaintsLoading, getComplaints } =
    useGetComplaints();

  const isLoading = useMemo(() => {
    return isGetComplaintsLoading;
  }, [isGetComplaintsLoading]);

  const onGetComplaintsPress = () => {
    getComplaints({
      page: page,
      perPage: 20,
      closed: closedComplaint,
      opened: openedComplaint,
    });
  };

  const onPressItem = (item: Complaint) => {
    console.log('onPressItem', item);
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
        title="Denúncias/Reclamações"
        RightComponent={
          <IconButton
            size={26}
            iconName="ios-refresh"
            onPress={onGetComplaintsPress}
          />
        }
      />
      <View style={styles.mainContainer}>
        <FlatList
          renderItem={onRenderItem}
          data={complaints}
          ListEmptyComponent={<EmptyList />}
        />
      </View>
    </Container>
  );
};

export default Complaints;
