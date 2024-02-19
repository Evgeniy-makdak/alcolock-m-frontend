import { useEventInfoApi } from '../api/useEventInfoApi';
import { dataMapperFromApi } from '../lib/dataMapperFromApi';

export const useEventInfo = (id: string | number) => {
  const { data, isLoading } = useEventInfoApi(id);
  const fields = dataMapperFromApi(data?.data);
  return { data: data?.data, isLoading, fields };
};
