import { CarsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import type { ID } from '@shared/types/BaseQueryTypes';
import { useQuery } from '@tanstack/react-query';

export const useVehiclesInfoApi = (id: ID) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.CAR_ITEM],
    queryFn: () => CarsApi.getCar(id),
  });
  return { car: data?.data, isLoading };
};
