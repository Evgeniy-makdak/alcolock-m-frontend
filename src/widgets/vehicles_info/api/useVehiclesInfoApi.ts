import { CarsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';
import type { ID } from '@shared/types/BaseQueryTypes';

export const useVehiclesInfoApi = (id: ID) => {
  const { data, isLoading } = useConfiguredQuery([QueryKeys.CAR_ITEM], CarsApi.getCar, id);
  return { car: data?.data, isLoading };
};
