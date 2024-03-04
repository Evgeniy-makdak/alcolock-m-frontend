import { BranchApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useGroupTableApi = (options?: PartialQueryOptions) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.BRANCH_LIST_TABLE, ...Object.values(options)],
    queryFn: () => BranchApi.getBranchList(options),
  });

  return { branchs: data?.data, isLoading, refetch };
};
