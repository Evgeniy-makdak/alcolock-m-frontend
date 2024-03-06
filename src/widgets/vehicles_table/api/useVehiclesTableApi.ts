import { CarsApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useVehiclesTableApi = (options: PartialQueryOptions) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: [QueryKeys.VEHICLES_PAGE_TABLE, ...Object.values(options)],
    queryFn: () => CarsApi.getCarsList(options),
  });
  return { cars: data?.data, isLoading, refetch };
};
