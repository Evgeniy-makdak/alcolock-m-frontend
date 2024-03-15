import type { ID, IRole } from '@shared/types/BaseQueryTypes';

export const adapterMapOptions = (val: IRole): [string, ID] => {
  return [`${val?.name}`, val.id];
};
