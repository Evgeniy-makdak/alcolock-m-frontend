import type { ID } from '@shared/types/BaseQueryTypes';

import { useUserInfoApi } from '../api/useUserInfoApi';
import { getFields } from '../lib/getFields';

export const useUserInfo = (id: ID) => {
  const { isLoading, userData } = useUserInfoApi(id);
  const fields = getFields(userData);

  return { fields, isLoading };
};
