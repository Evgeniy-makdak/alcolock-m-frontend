import { CarsApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useMarksCarQuery = (options?: PartialQueryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.MARKS_CAR, options.searchQuery],
    queryFn: () => CarsApi.getMarksCarList(options),
  });
  return { data, isLoading };
};
