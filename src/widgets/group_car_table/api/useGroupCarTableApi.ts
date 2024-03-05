import { CarsApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useGroupCarTableApi = (options: PartialQueryOptions) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.CAR_LIST, ...Object.values(options)],
    queryFn: () => CarsApi.getCarsList(options),
  });

  return { isLoading, cars: data?.data, refetch };
};
