import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';

import { API_URL } from '@shared/const/config';
import type { IError } from '@shared/types/BaseQueryTypes';
import { cookieManager } from '@shared/utils/cookie_manager';

const returnHeaders = (headers: AxiosRequestConfig['headers']): AxiosRequestConfig['headers'] => {
  const isAuth = headers?.isAuth ?? true;
  return new AxiosHeaders({
    ...headers,
    Authorization: isAuth ? `Bearer ${cookieManager.get('bearer')}` : '',
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
  return axios.get<IError, AxiosResponse<T, IError>>(requestUrl, {
    headers: returnHeaders(headers),
  });
}

export function postQuery<T, D>({
  headers,
  url,
  data,
}: {
  headers?: AxiosRequestConfig['headers'];
  url: string;
  data?: D;
}) {
  const requestUrl = `${API_URL}${url}`;
  return axios.post<IError, AxiosResponse<T, IError>>(requestUrl, data, {
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
  return axios.delete<IError, AxiosResponse<T, IError>>(requestUrl, {
    httpsAgent: 'fetch',
    headers: returnHeaders(headers),
  });
}
