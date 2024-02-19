import { AttachmentsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import type { AttachmentsCreateData } from '@shared/types/BaseQueryTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateAttachment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: AttachmentsCreateData) => {
      return AttachmentsApi.createItem(data, {
        'Content-Type': 'application/json',
        'Accept-Language': 'ru,en;q=0.9',
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.ATTACHMENT_LIST] });
    },
  });
  return mutate;
};
