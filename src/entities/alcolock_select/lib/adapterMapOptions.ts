import type { IAlcolock } from '@shared/types/BaseQueryTypes';

export const adapterMapOptions = (
  val: IAlcolock,
  vieBranch: boolean,
): [string, number | string] => {
  const branch = vieBranch ? `(${val?.assignment?.branch?.name})` : '';
  return [`${val.name} ${val.serialNumber} ${branch}`, val.id];
};
