import { type AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';

import { postQuery } from '@shared/api/baseQuery';
import type { IError } from '@shared/types/BaseQueryTypes';
import { useMutation } from '@tanstack/react-query';

export interface UserDataLogin {
  username: string | null;
  password: string | null;
}

export const useAuthApi = (onSuccess: (data: any) => void) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (data: UserDataLogin) =>
      postQuery({
        data: data,
        url: 'api/authenticate',
        headers: {
          method: 'POST',
          isAuth: false,
        },
      }),
    onSuccess: onSuccess,
    onError(error: AxiosError<IError>) {
      console.log(error);
      enqueueSnackbar(`${error?.response?.data?.detail} ${error?.response?.data.status}`, {
        variant: 'error',
      });
    },
  });
  return { mutate, isLoading: isPending };
};
