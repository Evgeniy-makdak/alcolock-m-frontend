import type { IUser } from '@shared/api/baseTypes';
import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

export const mapOptions = (drivers: IUser[]): Value[] => {
  return drivers.map((driver) => ({
    label: `${driver.middleName} ${driver.firstName} ${driver.lastName} ${driver.email}`,
    value: driver.id,
  }));
};
