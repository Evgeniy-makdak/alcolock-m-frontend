import { AlcolocksApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useAlcolockListQuery = (options: PartialQueryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.ALCOLOCK_LIST, options.searchQuery],
    queryFn: () => AlcolocksApi.getList(options),
  });

  return { data: data?.data || [], isLoading };
};
