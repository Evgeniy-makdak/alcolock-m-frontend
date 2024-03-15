import axios, {
  type AxiosError,
  AxiosHeaders,
  type AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { enqueueSnackbar } from 'notistack';

import { API_URL } from '@shared/const/config';
import { appStore } from '@shared/model/app_store/AppStore';
import type { IError } from '@shared/types/BaseQueryTypes';
import type { HeaderReq } from '@shared/types/QueryTypes';
import { cookieManager } from '@shared/utils/cookie_manager';

function viewResErrors(error: AxiosError<IError>): null {
  console.log('error', error);
  const fieldErrors = error?.response?.data?.fieldErrors;
  const status = error?.status || error?.response?.status;

  if (status === 401) {
    enqueueSnackbar(`Сессия авторизации закончена, авторизуйтесь заново`, {
      onClose: appStore.getState().logout,
      onExit: appStore.getState().logout,
      variant: 'error',
    });
  }
  fieldErrors &&
    fieldErrors.map((e) => {
      enqueueSnackbar(e.message, {
        preventDuplicate: true,
        variant: 'error',
      });
    });
  return null;
}

const returnHeaders = (headers: HeaderReq): HeaderReq => {
  const isAuth = headers?.isAuth ?? true;
  return new AxiosHeaders({
    ...headers,
    Authorization: isAuth ? `Bearer ${cookieManager.get('bearer')}` : '',
    Accept: '*/*',
  });
};

export function getQuery<T>({ url, config }: { url: string; config?: AxiosRequestConfig }) {
  const requestUrl = `${API_URL}${url}`;
  const headersReg = returnHeaders(config?.headers);

  return axios
    .get<IError, AxiosResponse<T, IError>>(requestUrl, {
      headers: { ...config?.headers, ...headersReg },
      ...config,
    })
    .catch((e) => {
      return viewResErrors(e);
    });
}

export function postQuery<T, D>({
  headers,
  url,
  data,
}: {
  headers?: HeaderReq;
  url: string;
  data?: D;
}) {
  const requestUrl = `${API_URL}${url}`;
  return axios
    .post<IError, AxiosResponse<T, IError>>(requestUrl, data, {
      headers: returnHeaders(headers),
    })
    .catch((e) => {
      return viewResErrors(e);
    });
}

export function putQuery<T, D>({
  headers,
  url,
  data,
}: {
  headers?: HeaderReq;
  url: string;
  data?: D;
}) {
  const requestUrl = `${API_URL}${url}`;
  return axios
    .put<IError, AxiosResponse<T, IError>>(requestUrl, data, {
      headers: returnHeaders(headers),
    })
    .catch((e) => {
      return viewResErrors(e);
    });
}

export function deleteQuery<T>({ headers, url }: { headers?: HeaderReq; url: string }) {
  const requestUrl = `${API_URL}${url}`;
  return axios
    .delete<IError, AxiosResponse<T, IError>>(requestUrl, {
      httpsAgent: 'fetch',
      headers: returnHeaders(headers),
    })
    .catch((e) => {
      return viewResErrors(e);
    });
}
