import { AccountApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';

export const useUserDataApi = () => {
  const { data, isLoading } = useConfiguredQuery(
    [QueryKeys.ACCOUNT],
    AccountApi.getAccountData,
    null,
  );

  return { user: data?.data, isLoading };
};
