import { CarsApi, type PartialQueryOptions, QueryKeys } from '@shared/api/baseQuerys';
import { useQuery } from '@tanstack/react-query';

export const useCarListQuery = (options: PartialQueryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.CAR_LIST, options.searchQuery],
    queryFn: () => CarsApi.getCarsList(options),
  });
  return { data: data?.data || [], isLoading };
};
