import { AlcolocksApi, type CreateAlcolockData } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useUpdateQueries } from '@shared/hooks/useUpdateQuerys';
import type { ID } from '@shared/types/BaseQueryTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

const updateQueries = [
  QueryKeys.ALCOLOCK_LIST,
  QueryKeys.ALKOLOCK_ITEM,
  QueryKeys.ALKOLOCK_LIST_TABLE,
];

export const useAlkozamkiFormApi = (id?: ID) => {
  const update = useUpdateQueries();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.ALKOLOCK_ITEM, id],
    queryFn: () => AlcolocksApi.getAlkolock(id),
    enabled: !!id,
  });

  const { mutateAsync: changeItem } = useMutation({
    mutationFn: (changeData: CreateAlcolockData) => AlcolocksApi.changeItem(changeData, id),
    onSuccess: () => update(updateQueries),
  });

  const { mutateAsync: createItem } = useMutation({
    mutationFn: (changeData: CreateAlcolockData) => AlcolocksApi.createItem(changeData),
    onSuccess: () => update(updateQueries),
  });

  return { alkolock: data?.data, isLoadingAlkolock: isLoading, changeItem, createItem };
};
