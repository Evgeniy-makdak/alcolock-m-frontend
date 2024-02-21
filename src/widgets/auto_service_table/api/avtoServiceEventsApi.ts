import { EventsApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useAvtoServiceEventsApi = (options: PartialQueryOptions) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.AUTO_SERVICE_EVENTS_LIST, ...Object.values(options)],
    queryFn: () => EventsApi.getEventListForAutoService(options),
  });
  return { data, isLoading, refetch };
};
