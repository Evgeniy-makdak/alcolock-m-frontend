import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';

import { API_URL } from '@shared/const/config';
import { SortTypes, SortsTypes } from '@shared/const/types';
import { cookieManager } from '@shared/utils/cookie_manager';

export interface QueryOptions {
  page: number;
  equals: string;
  limit: number | string;
  sortBy: SortTypes;
  searchQuery: string;
  order: SortsTypes;
  startDate: string;
  endDate: string;
  filterOptions?: {
    drivers?: string;
    users: string;
    brandCar?: string;
    gosNumber?: string;
    typeOfEvent?: string;
    cars?: string;
    alcolock?: string;
    createLink?: string;
    dateLink?: string;
  };
  id: string;
}

const returnHeaders = (headers: AxiosRequestConfig['headers']): AxiosRequestConfig['headers'] => {
  return new AxiosHeaders({
    ...headers,
    Authorization: `Bearer ${cookieManager.get('bearer')}`,
    Accept: '*/*',
  });
};

export function getQuery<T>({
  headers,
  url,
}: {
  headers?: AxiosRequestConfig['headers'];
  url: string;
}) {
  const requestUrl = `${API_URL}${url}`;
  return axios
    .get<any, AxiosResponse<T, any>>(requestUrl, {
      headers: returnHeaders(headers),
    })
    .then((res) => res);
}

export function postQuery<T, D>({
  headers,
  url,
  data,
}: {
  headers?: AxiosRequestConfig['headers'];
  url: string;
  data: D;
}) {
  const requestUrl = `${API_URL}${url}`;
  return axios.post<any, AxiosResponse<T, any>>(requestUrl, data, {
    headers: returnHeaders(headers),
  });
}

export function deleteQuery<T>({
  headers,
  url,
}: {
  headers?: AxiosRequestConfig['headers'];
  url: string;
}) {
  const requestUrl = `${API_URL}${url}`;
  return axios.delete<any, AxiosResponse<T, any>>(requestUrl, {
    httpsAgent: 'fetch',
    headers: returnHeaders(headers),
  });
}
