import type { ID } from '@shared/types/BaseQueryTypes';

import { useAlkozamkiInfoApi } from '../api/useAlkozamkiInfoApi';
import { getFields } from '../lib/getFields';

export const useAlkozamkiInfo = (id: ID) => {
  const { alkolock, isLoading } = useAlkozamkiInfoApi(id);

  const fields = getFields(alkolock);

  return { fields, isLoading, alkolock };
};
