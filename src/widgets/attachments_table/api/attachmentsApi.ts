import { AttachmentsApi, PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAttachmentsApi = (options: PartialQueryOptions) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.ATTACHMENT_LIST, ...Object.values(options)],
    queryFn: () => AttachmentsApi.getList(options),
    refetchInterval: 30000,
  });
  const { mutate } = useMutation({
    mutationFn: (id: number) => {
      return AttachmentsApi.deleteItem(id, {
        'Content-Type': 'application/json',
        'Content-Length': 32,
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.ATTACHMENT_LIST] });
    },
  });
  return { data: data?.data, count: data?.data.length, isLoading, mutate, refetch };
};
