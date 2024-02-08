import type { IAlcolocks } from '@shared/api/baseTypes';
import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

export const mapOptions = (data: IAlcolocks[]): Value[] => {
  return data.map((val) => ({
    value: val.id,
    label: `${val.name} ${val.serialNumber}`,
  }));
};
