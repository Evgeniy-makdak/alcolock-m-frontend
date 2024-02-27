import { AlcolocksApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

import { ID } from './../../../shared/types/BaseQueryTypes';

export const useAlkozamkiInfoApi = (id: ID) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.ALKOLOCK_ITEM],
    queryFn: () => AlcolocksApi.getAlkolock(id),
    enabled: !!id,
  });

  return { alkolock: data?.data, isLoading };
};
