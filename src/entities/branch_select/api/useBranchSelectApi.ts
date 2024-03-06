import { BranchApi, type PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useBranchSelectApi = (options?: PartialQueryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.BRANCH_LIST_SELECT, ...Object.values(options)],
    queryFn: () => BranchApi.getBranchList(options),
  });

  return { branch: data?.data, isLoading };
};
