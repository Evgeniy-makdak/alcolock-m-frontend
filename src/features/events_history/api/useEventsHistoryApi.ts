import { EventsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { SortTypes, SortsTypes } from '@shared/const/types';
import type { EventsOptions } from '@shared/types/BaseQueryTypes';
import { useQuery } from '@tanstack/react-query';

export const useEventsHistoryApi = (options: EventsOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.EVENTS_LIST_HISTORY, QueryKeys.EVENTS_LIST],
    queryFn: () =>
      EventsApi.getEventsHistory({
        ...options,
        order: SortsTypes.desc,
        sortBy: SortTypes.DATE_OCCURRENT,
      }),
  });
  return { data: data?.data, isLoading };
};
