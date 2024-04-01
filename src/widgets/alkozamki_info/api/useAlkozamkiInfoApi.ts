import { AlcolocksApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useConfiguredQuery } from '@shared/hooks/useConfiguredQuery';
import { ID } from '@shared/types/BaseQueryTypes';

export const useAlkozamkiInfoApi = (id: ID) => {
  const { data, isLoading } = useConfiguredQuery(
    [QueryKeys.ALKOLOCK_ITEM],
    AlcolocksApi.getAlkolock,
    { options: id, settings: { enabled: !!id } },
  );

  return { alkolock: data?.data, isLoading };
};
