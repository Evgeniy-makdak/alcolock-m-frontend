import { type PartialQueryOptions, UsersApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useGroupUsersTableApi = (options: PartialQueryOptions) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.USER_LIST, ...Object.values(options)],
    queryFn: () => UsersApi.getList(options, true),
  });

  return { isLoading, users: data?.data, refetch };
};
