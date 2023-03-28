import axios, { RawAxiosRequestHeaders } from 'axios';

import { ApiType } from './types';
import { get, set } from '../secure-store';

import { API_URL } from '@env';

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function refreshToken() {
  const token = get('@user-refresh-token');

  return Api({
    method: 'post',
    url: '/credential/refresh',
    headers: { Authorization: `Bearer ${token}` },
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
        err.response.data.message === 'Token expirado.' &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const response = await refreshToken();

          set('@user-access-token', response.access_token);
          set('@user-refresh-token', response.refresh_token);

          originalConfig.headers = {
            ...originalConfig.headers,
            Authorization: `Bearer ${response.access_token}`,
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
    const accessToken = (await get('@user-access-token')) || '';
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  }

  const response = await instance({
    url,
    method,
    data,
    headers: requestHeaders,
  });

  if (response.data) {
    console.log('RESPONSE', response.data);
  }

  return response.data;
}
