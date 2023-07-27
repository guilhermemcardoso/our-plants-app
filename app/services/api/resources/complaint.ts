import { Api } from '~/services/api';

export async function getComplaints({
  page,
  perPage,
  closed,
  opened,
}: {
  page: number;
  perPage: number;
  closed: boolean;
  opened: boolean;
}) {
  return await Api({
    method: 'get',
    url: `complaint/list?page=${page}&perPage=${perPage}&closed=${closed}&open=${opened}`,
    hasToken: true,
  });
}

export async function getMyComplaints({
  page,
  perPage,
  closed,
  opened,
}: {
  page: number;
  perPage: number;
  closed: boolean;
  opened: boolean;
}) {
  return await Api({
    method: 'get',
    url: `complaint/my-complaints?page=${page}&perPage=${perPage}&closed=${closed}&open=${opened}`,
    hasToken: true,
  });
}

export async function createComplaint(complaintData: {
  plantId: string;
  description: string;
  reason: string;
}) {
  return await Api({
    method: 'post',
    url: 'complaint',
    data: complaintData,
    hasToken: true,
  });
}

export async function evaluateComplaint({
  plantId,
  evaluation,
  wasHelpful,
}: {
  plantId: string;
  evaluation: string;
  wasHelpful: boolean;
}) {
  return await Api({
    method: 'post',
    url: `complaint/${plantId}`,
    data: {
      evaluation: evaluation,
      was_helpful: wasHelpful,
    },
    hasToken: true,
  });
}

export async function deleteComplaint({ plantId }: { plantId: string }) {
  return await Api({
    method: 'delete',
    url: `complaint/${plantId}`,
    hasToken: true,
  });
}
