import { AccountApi, EventsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useNavBarApi = () => {
  const {
    data,
    isLoading: isLoadingAccountData,
    refetch: refetchAccountData,
  } = useQuery({
    queryKey: [QueryKeys.ACCOUNT],
    queryFn: () => AccountApi.getAccountData(),
  });
  const { data: list, isLoading: isLoadingAvtoServiceEventList } = useQuery({
    queryKey: [QueryKeys.AUTO_SERVICE_EVENTS_LIST],
    queryFn: () => EventsApi.getEventListForAutoService({}),
  });

  return {
    refetchAccountData,
    userData: data?.data,
    isLoadingAccountData,
    isLoadingAvtoServiceEventList,
    length: list?.data?.length,
  };
};
