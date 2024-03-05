import { BranchApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import type { ID } from '@shared/types/BaseQueryTypes';
import { useQuery } from '@tanstack/react-query';

export const useGroupsApi = (id: ID) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.BRANCH_ITEM, id],
    queryFn: () => BranchApi.getBranch(id),
    enabled: !!id,
  });

  return { branch: data?.data, isLoading, refetch };
};
