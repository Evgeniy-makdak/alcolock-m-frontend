import { UsersApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';
import type { ID } from '@shared/types/BaseQueryTypes';

export const useUserInfoApi = (id: ID) => {
  const { data, isLoading } = useConfiguredQuery([QueryKeys.USER_ITEM], UsersApi.getUser, {
    options: id,
    settings: {
      enabled: !!id,
    },
  });
  return { userData: data?.data, isLoading };
};
