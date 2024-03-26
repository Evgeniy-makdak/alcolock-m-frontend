import { AccountApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';

export const useNavBarApi = () => {
  const {
    data,
    isLoading: isLoadingAccountData,
    error,
    refetch: refetchAccountData,
  } = useConfiguredQuery([QueryKeys.ACCOUNT], AccountApi.getAccountData, null, {
    networkMode: 'offlineFirst',
  });

  // const { data: count, isLoading: isLoadingAvtoServiceEventList } = useConfiguredQuery(
  //   [QueryKeys.EVENTS_COUNT],
  //   EventsApi.getCount,
  //   null,
  //   { refetchInterval: 15000 },
  // );
  return {
    refetchAccountData,
    userData: data?.data,
    isLoadingAccountData,
    length: 0,
    error,
  };
};
