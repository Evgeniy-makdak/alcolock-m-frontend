import type { IAlcolocks } from '@shared/types/BaseQueryTypes';

export const adapterMapOptions = (val: IAlcolocks): [string, number | string] => {
  return [`${val.name} ${val.serialNumber}`, val.id];
};
