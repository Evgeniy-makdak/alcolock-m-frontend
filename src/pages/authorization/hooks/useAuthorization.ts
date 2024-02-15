import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { enqueueSnackbar } from 'notistack';

import { RoutePaths } from '@app/index';
import { AuthStatus, appAuthStatusState, appTokenState, refreshTokenState } from '@app/model/store';
import type { AuthError } from '@shared/api/baseTypes';
import { cookieManager } from '@shared/utils/cookie_manager';
import { ValidationRules } from '@shared/validations/validation_rules';

import { type UserDataLogin, useAuthApi } from '../api/authApi';

export const useAuthorization = () => {
  const { handleSubmit, control, setError } = useForm<UserDataLogin>();

  const navigate = useNavigate();

  // TODO => после swagger написать типы
  const onSuccess = (data: any) => {
    const errors = data?.data?.response?.data?.fieldErrors || [];

    if (errors.length > 0) {
      errors.map((error: AuthError) => {
        enqueueSnackbar(`Поле ${error.field} ${error?.message}`, { variant: 'error' });
      });

      return;
    }
    if (data.data.idToken) {
      // TODO избавить приложение от использования токенов в store
      // Токены должны быть только в cookie и бэк должен вернуть ошибку
      // not auth например и приложение должно перекинуться на авторизацию
      cookieManager.set('bearer', data.data.idToken);
      appTokenState.setState(data.data.idToken);

      if (data?.data?.refreshToken) {
        cookieManager.set('refresh', data?.data?.refreshToken);
        refreshTokenState.setState(data?.data?.refreshToken);
      }

      appAuthStatusState.setState(AuthStatus.auth);
      navigate(RoutePaths.events);
    }
  };

  const { mutate: enter, isLoading } = useAuthApi(onSuccess);

  const validateEmail = (value: string) => {
    const validEmail = ValidationRules.emailValidation(value);
    const isValid = validEmail.length === 0;
    !isValid && setError('username', { message: validEmail[0] });
    return isValid;
  };

  const validatePassword = (value: string) => {
    const validPassword = ValidationRules.requiredValidation(value);
    const isValid = validPassword.length === 0;
    !isValid && setError('password', { message: validPassword[0] });
    return isValid;
  };

  const handleAuthorization = (data: UserDataLogin) => {
    const validEmail = validateEmail(data.username);
    const validPassword = validatePassword(data.password);
    if (!validEmail || !validPassword) return;

    enter(data);
  };

  return {
    handleSubmit,
    handleAuthorization,
    isLoading,
    control,
  };
};
