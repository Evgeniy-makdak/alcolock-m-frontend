import type { QueryKeys } from '@shared/const/storageKeys';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateQueries = () => {
  const queryClient = useQueryClient();
  return (arr: QueryKeys[]) => {
    arr.map((key) => queryClient.refetchQueries({ queryKey: [key] }));
  };
};
