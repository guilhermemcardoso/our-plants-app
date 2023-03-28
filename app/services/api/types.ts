import { RawAxiosRequestHeaders } from 'axios';

export type ApiType = {
  method: 'get' | 'delete' | 'head' | 'post' | 'put' | 'patch';
  hasToken?: boolean;
  url: string;
  headers?: RawAxiosRequestHeaders;
  data?: unknown;
  pathData?: string;
};
