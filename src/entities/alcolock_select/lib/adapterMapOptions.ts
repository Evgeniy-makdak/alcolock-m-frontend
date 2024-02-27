import type { IAlcolock } from '@shared/types/BaseQueryTypes';

export const adapterMapOptions = (val: IAlcolock): [string, number | string] => {
  return [`${val.name} ${val.serialNumber}`, val.id];
};
