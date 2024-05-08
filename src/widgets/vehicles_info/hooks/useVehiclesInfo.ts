import type { ID } from '@shared/types/BaseQueryTypes';

import { useVehiclesInfoApi } from '../api/useVehiclesInfoApi';
import { getFields } from '../lib/getFields';

export const useVehiclesInfo = (id: ID) => {
  const { car, isLoading } = useVehiclesInfoApi(id);
  const fields = getFields(car);
  return { isLoading, fields };
};
