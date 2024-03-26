import { AccountApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';

export const useAppApi = (isAdmin: boolean) => {
  const { data, isLoading, refetch, isSuccess, error, isError } = useConfiguredQuery(
    [QueryKeys.ACCOUNT],
    AccountApi.getAccountData,
    null,
    {
      enabled: !isAdmin,
    },
  );

  return { user: data?.data, isLoading, refetch, isSuccess, error, isError };
};
