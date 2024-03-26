import { type AxiosError, type AxiosResponse } from 'axios';
import { enqueueSnackbar } from 'notistack';

import { UsersApi } from '@shared/api/baseQuerys';
import type { IAuthenticate, IError, UserDataLogin } from '@shared/types/BaseQueryTypes';
import { useMutation } from '@tanstack/react-query';

export const useAuthApi = (onSuccess: (data: AxiosResponse<IAuthenticate, IError>) => void) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (data: UserDataLogin) => UsersApi.authenticate(data),
    onSuccess: onSuccess,
    onError(error: AxiosError<IError>) {
      enqueueSnackbar(`${error?.response?.data?.detail} ${error?.response?.data.status}`, {
        variant: 'error',
      });
    },
  });

  return { mutate, isLoading: isPending };
};
