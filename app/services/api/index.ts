import axios, { AxiosError, RawAxiosRequestHeaders } from 'axios';

import { ApiType } from './types';
import { getKey, setKey } from '../secure-store';

import { API_URL } from '@env';
import { EncryptedKeys } from '../secure-store/constants';

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchRefreshToken() {
  const accessToken = await getKey(EncryptedKeys.ACCESS_TOKEN);
  const refreshToken = await getKey(EncryptedKeys.REFRESH_TOKEN);

  return Api({
    method: 'post',
    url: '/auth/refresh',
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { refresh_token: refreshToken },
  });
}

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (
        err.response.status === 401 &&
        err.response.data.message === 'Unauthorized.' &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const { response, status } = await fetchRefreshToken();

          if (status === 200) {
            setKey(EncryptedKeys.ACCESS_TOKEN, response.data.access_token);
            setKey(EncryptedKeys.REFRESH_TOKEN, response.refresh_token);
          }

          originalConfig.headers = {
            ...originalConfig.headers,
            Authorization: `Bearer ${response.data.access_token}`,
          };
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export async function Api({ method, url, data, hasToken, headers }: ApiType) {
  const requestHeaders: RawAxiosRequestHeaders = headers || {};

  if (hasToken) {
    const accessToken = (await getKey(EncryptedKeys.ACCESS_TOKEN)) || '';
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await instance({
      url,
      method,
      data,
      headers: requestHeaders,
    });
    return { response: response.data, status: response.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { response: error.response?.data, status: error.response?.status };
    }
    return { response: JSON.stringify(error), status: 500 };
  }
}
