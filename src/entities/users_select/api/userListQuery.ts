import { type PartialQueryOptions, UsersApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useUserListQuery = (options: PartialQueryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.USER_LIST, options.searchQuery],
    queryFn: () => UsersApi.getList(options),
  });

  return { data: data?.data || [], isLoading };
};
