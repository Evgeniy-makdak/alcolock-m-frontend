import { AppConstants } from '@app/index';
import { mapOptions } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

export const useCarColorSelect = () => {
  // TODO => должна быть ручка api а не хардкожен в массиве
  const colorCarList = mapOptions(AppConstants.carColorsList, (data) => [data.label, data.value]);
  return { colorCarList };
};
