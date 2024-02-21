import { EventsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import type { ID } from '@shared/types/BaseQueryTypes';
import { useQuery } from '@tanstack/react-query';

export const useAutoServiceInfoApi = (id: ID) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.AVTOSERVISE_EVENTS_ITEM, id],
    queryFn: () => EventsApi.getEventItem(id),
  });
  return { data, isLoading, refetch };
};
