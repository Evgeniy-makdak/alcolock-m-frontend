import type { IBranch } from '@shared/types/BaseQueryTypes';

export const adapterMapOptions = (branch: IBranch): [string, number | string] => {
  return [branch?.name, branch?.id];
};
