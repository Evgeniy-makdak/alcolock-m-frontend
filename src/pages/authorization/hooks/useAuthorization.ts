import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { AxiosResponse } from 'axios';
import { enqueueSnackbar } from 'notistack';

import { yupResolver } from '@hookform/resolvers/yup';
import { RoutePaths } from '@shared/config/routePathsEnum';
import { appStore } from '@shared/model/app_store/AppStore';
import type { AuthError, IAuthenticate, IError, UserDataLogin } from '@shared/types/BaseQueryTypes';
import { cookieManager } from '@shared/utils/cookie_manager';

import { useAuthApi } from '../api/authApi';
import { schema } from '../lib/validate';

export const useAuthorization = () => {
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    control,
    formState: {
      errors: { password, username },
    },
  } = useForm({
    defaultValues: {
      rememberMe: false,
    },
    resolver: yupResolver(schema),
  });
  const setState = appStore.setState;
  const navigate = useNavigate();

  const handleChangeRemeber = (value: boolean) => {
    setValue('rememberMe', value);
  };

  // TODO => после swagger написать типы
  const onSuccess = (data: AxiosResponse<IAuthenticate, IError>) => {
    const errors = data?.data?.response?.data?.fieldErrors || [];

    if (errors.length > 0) {
      errors.map((error: AuthError) => {
        enqueueSnackbar(`Поле ${error.field} ${error?.message}`, { variant: 'error' });
      });

      return;
    }
    const idToken = data?.data?.idToken;
    if (idToken) {
      // TODO избавить приложение от использования токенов
      // Токены должны быть только в cookie и бэк должен вернуть ошибку
      // not auth например и приложение должно перекинуться на авторизацию
      cookieManager.set('bearer', idToken);

      const refreshToken = data.data?.refreshToken;
      if (refreshToken) {
        cookieManager.set('refresh', refreshToken);
      }

      setState({
        auth: true,
      });
      navigate(RoutePaths.events);
    }
  };

  const { mutate: enter, isLoading } = useAuthApi(onSuccess);

  const handleAuthorization = (data: UserDataLogin) => {
    enter(data);
  };

  const errorPassword = password ? password?.message : '';
  const errorUsername = username ? username?.message : '';
  return {
    handleSubmit: handleSubmit(handleAuthorization),
    isLoading,
    register,
    errorPassword,
    errorUsername,
    control,
    remeberMe: watch('rememberMe'),
    handleChangeRemeber,
  };
};
