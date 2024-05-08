import axios, {
  type AxiosError,
  AxiosHeaders,
  type AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { enqueueSnackbar } from 'notistack';

import { API_URL } from '@shared/config/permissionsEnums';
import { RoutePaths } from '@shared/config/routePathsEnum';
import { StatusCode } from '@shared/const/statusCode';
import { appStore } from '@shared/model/app_store/AppStore';
import type { IError } from '@shared/types/BaseQueryTypes';
import type { HeaderReq } from '@shared/types/QueryTypes';
import { cookieManager } from '@shared/utils/cookie_manager';

type AppAxiosResponse<T> = {
  isError?: boolean;
} & AxiosResponse<T, IError>;

let countOfSnacksOfAuthError = 0;

function viewResErrors<T>(error: AxiosError<IError>): AppAxiosResponse<T> {
  const fieldErrors = error?.response?.data?.fieldErrors;
  const status = error?.status || error?.response?.status;
  const isAuthError = status === StatusCode.UNAUTHORIZED;
  const url = window.location.href;
  const isAuthPage = url.includes(RoutePaths.auth);

  if (isAuthError && countOfSnacksOfAuthError === 0 && !isAuthPage) {
    countOfSnacksOfAuthError += 1;
    const logout = appStore.getState().logout;
    const snackExit = () => {
      logout();
      countOfSnacksOfAuthError = 0;
    };
    enqueueSnackbar(`Сессия авторизации закончена, авторизуйтесь заново`, {
      onClose: snackExit,
      onExit: snackExit,
      variant: 'error',
    });
  }
  fieldErrors &&
    !isAuthError &&
    fieldErrors.map((e) => {
      enqueueSnackbar(e.message, {
        preventDuplicate: true,
        variant: 'error',
      });
    });
  return {
    data: null,
    status: status,
    config: error?.config,
    headers: error?.request,
    statusText: error?.response?.statusText,
    isError: true,
  };
}

const returnHeaders = (headers: HeaderReq): HeaderReq => {
  const isAuth = headers?.isAuth ?? true;
  return new AxiosHeaders({
    ...headers,
    Authorization: isAuth ? `Bearer ${cookieManager.get('bearer')}` : '',
    Accept: '*/*',
  });
};

export async function getQuery<T>({
  url,
  config,
}: {
  url: string;
  config?: AxiosRequestConfig;
}): Promise<AppAxiosResponse<T>> {
  const requestUrl = `${API_URL}${url}`;
  const headersReg = returnHeaders(config?.headers);

  try {
    return await axios
      .get<IError, AppAxiosResponse<T>>(requestUrl, {
        headers: { ...config?.headers, ...headersReg },
        ...config,
      });
  } catch (e) {
    return viewResErrors(e);
  }
}

export async function postQuery<T, D>({
  headers,
  url,
  data,
}: {
  headers?: HeaderReq;
  url: string;
  data?: D;
}) {
  const requestUrl = `${API_URL}${url}`;
  try {
    return await axios
      .post<IError, AppAxiosResponse<T>>(requestUrl, data, {
        headers: returnHeaders(headers),
      });
  } catch (e) {
    return viewResErrors(e);
  }
}

export async function putQuery<T, D>({
  headers,
  url,
  data,
}: {
  headers?: HeaderReq;
  url: string;
  data?: D;
}) {
  const requestUrl = `${API_URL}${url}`;
  try {
    return await axios
      .put<IError, AppAxiosResponse<T>>(requestUrl, data, {
        headers: returnHeaders(headers),
      });
  } catch (e) {
    return viewResErrors(e);
  }
}

export async function deleteQuery<T>({ headers, url }: { headers?: HeaderReq; url: string }) {
  const requestUrl = `${API_URL}${url}`;
  try {
    return await axios
      .delete<IError, AppAxiosResponse<T>>(requestUrl, {
        httpsAgent: 'fetch',
        headers: returnHeaders(headers),
      });
  } catch (e) {
    return viewResErrors(e);
  }
}
