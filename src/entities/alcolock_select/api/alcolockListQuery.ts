import { AlcolocksApi, type PartialQueryOptions, QueryKeys } from '@shared/api/baseQuerys';
import { useQuery } from '@tanstack/react-query';

export const useAlcolockListQuery = (options: PartialQueryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.ALCOLOCK_LIST, options.searchQuery],
    queryFn: () => AlcolocksApi.getList(options),
  });

  return { data: data?.data || [], isLoading };
};
