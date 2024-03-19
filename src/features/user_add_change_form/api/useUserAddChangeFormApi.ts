import { UsersApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';
import { useUpdateQueries } from '@shared/hooks/useUpdateQuerys';
import type { CreateUserData, ID } from '@shared/types/BaseQueryTypes';
import { useMutation } from '@tanstack/react-query';

const updateQueries = [QueryKeys.USER_LIST_TABLE, QueryKeys.USER_LIST];

export const useUserAddChangeFormApi = (id: ID) => {
  const update = useUpdateQueries();
  const { data, isLoading } = useConfiguredQuery([QueryKeys.USER_ITEM], UsersApi.getUser, id, {
    enabled: !!id,
  });

  const { mutateAsync: changeItem } = useMutation({
    mutationFn: (changeData: CreateUserData) => UsersApi.changeUser(changeData, id),
    onSuccess: () => update(updateQueries),
  });

  const { mutateAsync: createItem } = useMutation({
    mutationFn: (data: CreateUserData) => UsersApi.createUser(data),
    onSuccess: () => update(updateQueries),
  });
  return { user: data?.data, isLoading, changeItem, createItem };
};
