import { EventsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useEventInfoApi = (id: string | number) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.EVENTS_ITEM, id],
    queryFn: () => EventsApi.getEventItem(id),
  });
  return { data, isLoading };
};
