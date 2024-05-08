import { AccountApi, EventsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';

export const useNavBarApi = () => {
  const {
    data,
    isLoading: isLoadingAccountData,
    error,
    refetch: refetchAccountData,
  } = useConfiguredQuery([QueryKeys.ACCOUNT], AccountApi.getAccountData, {
    settings: {
      networkMode: 'offlineFirst',
    },
    triggerOnBranchChange: false,
  });

  const { data: auto } = useConfiguredQuery(
    [QueryKeys.AUTO_SERVICE_EVENTS_LIST],
    EventsApi.getEventListForAutoService,
    {},
  );

  return {
    refetchAccountData,
    userData: data?.data,
    isLoadingAccountData,
    length: auto?.data?.length || 0,
    error,
  };
};
