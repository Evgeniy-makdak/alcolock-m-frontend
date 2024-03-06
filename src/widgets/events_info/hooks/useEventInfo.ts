import type { ID } from '@shared/types/BaseQueryTypes';

import { useEventInfoApi } from '../api/useEventInfoApi';
import { dataMapperFromApi } from '../lib/dataMapperFromApi';

export const useEventInfo = (id: ID) => {
  const { data, isLoading } = useEventInfoApi(id);
  const fields = dataMapperFromApi(data?.data);
  return { data: data?.data, isLoading, fields };
};
