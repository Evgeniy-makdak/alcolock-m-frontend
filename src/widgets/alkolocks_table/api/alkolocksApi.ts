import { AlcolocksApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useAlkolocksApi = (options: PartialQueryOptions) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.ALKOLOCK_LIST_TABLE, ...Object.values(options)],
    queryFn: () => AlcolocksApi.getListAlcolocks(options),
    refetchInterval: 30000,
  });
  return { data: data?.data, isLoading, refetch };
};
