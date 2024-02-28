import { EventsApi, type EventsOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useEventsHistoryApi = (options: EventsOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.EVENTS_LIST_HISTORY, QueryKeys.EVENTS_LIST],
    queryFn: () => EventsApi.getEventsHistory(options),
  });
  return { data: data?.data, isLoading };
};
