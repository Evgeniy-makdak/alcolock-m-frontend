import { AttachmentsApi, PartialQueryOptions } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useQuery } from '@tanstack/react-query';

export const useAttachmentsApi = (options: PartialQueryOptions) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.ATTACHMENT_LIST, ...Object.values(options)],
    queryFn: () => AttachmentsApi.getList(options),
    refetchInterval: 30000,
  });

  return { data: data?.data, count: data?.data.length, isLoading, refetch };
};
