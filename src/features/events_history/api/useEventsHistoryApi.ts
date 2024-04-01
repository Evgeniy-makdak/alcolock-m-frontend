import { EventsApi } from '@shared/api/baseQuerys';
import { SortTypes, SortsTypes } from '@shared/config/queryParamsEnums';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';
import type { EventsOptions } from '@shared/types/BaseQueryTypes';

export const useEventsHistoryApi = (options: EventsOptions) => {
  const { data, isLoading } = useConfiguredQuery(
    [QueryKeys.EVENTS_LIST_HISTORY, QueryKeys.EVENTS_LIST],
    EventsApi.getEventsHistory,
    {
      options: {
        ...options,
        order: SortsTypes.desc,
        sortBy: SortTypes.DATE_OCCURRENT,
      },
    },
  );
  return { data: data?.data, isLoading };
};
