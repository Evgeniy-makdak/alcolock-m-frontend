import type { IUser } from '@shared/types/BaseQueryTypes';

export const adapterMapOptions = (driver: IUser): [string, number | string] => {
  return [`${driver.middleName} ${driver.firstName} ${driver.lastName} ${driver.email}`, driver.id];
};
