import { RolesApi, UsersApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';
import { useUpdateQueries } from '@shared/hooks/useUpdateQuerys';
import type { CreateUserData, ID } from '@shared/types/BaseQueryTypes';
import { useMutation } from '@tanstack/react-query';

const updateQueries = [QueryKeys.USER_LIST_TABLE, QueryKeys.USER_LIST];

export const useUserAddChangeFormApi = (id: ID) => {
  const update = useUpdateQueries();
  const { data, isLoading } = useConfiguredQuery([QueryKeys.USER_ITEM], UsersApi.getUser, {
    options: id,
    settings: {
      enabled: !!id,
    },
  });
  // TODO => убрать запрос когда бэк начнет возвращать в user permissions
  const { data: userGroups, isLoading: isLoadingUserGroups } = useConfiguredQuery(
    [QueryKeys.ROLES_LIST],
    RolesApi.getList,
    {
      settings: {
        enabled: !!id,
        networkMode: 'offlineFirst',
      },
    },
  );

  const { mutateAsync: changeItem } = useMutation({
    mutationFn: (changeData: CreateUserData) => UsersApi.changeUser(changeData, id),
    onSuccess: () => update(updateQueries),
  });

  const { mutateAsync: createItem } = useMutation({
    mutationFn: (data: CreateUserData) => UsersApi.createUser(data),
    onSuccess: () => update(updateQueries),
  });
  return {
    groups: userGroups?.data,
    user: data?.data,
    isLoading: isLoading || isLoadingUserGroups,
    changeItem,
    createItem,
  };
};
