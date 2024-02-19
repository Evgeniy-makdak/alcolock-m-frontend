import { EventsApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useEventsApi = (options: PartialQueryOptions) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.EVENTS_LIST, ...Object.values(options)],
    queryFn: () => EventsApi.getList(options),
    refetchInterval: 30000,
    retry: 3,
    retryDelay: 1000,
  });

  return { isLoading, data, refetch };
};
