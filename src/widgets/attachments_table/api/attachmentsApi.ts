import { AttachmentsApi, PartialQueryOptions, QueryKeys } from '@shared/api/baseQuerys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAttachmentsApi = (options: PartialQueryOptions) => {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      QueryKeys.ATTACHMENT_LIST,
      options.searchQuery,
      options.startDate,
      options.endDate,
      options.limit,
      options.page,
    ],
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
