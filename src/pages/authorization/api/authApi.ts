import { postQuery } from '@shared/api/baseQuery';
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
  });
  return { mutate, isLoading: isPending };
};
