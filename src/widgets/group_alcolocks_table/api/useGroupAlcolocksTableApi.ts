import { AlcolocksApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useGroupAlcolocksTableApi = (options: PartialQueryOptions) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.ALKOLOCK_LIST_TABLE, ...Object.values(options)],
    queryFn: () => AlcolocksApi.getListAlcolocks(options),
  });
  return { alcolocks: data?.data, isLoading, refetch };
};
