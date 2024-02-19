import { AppConstants } from '@app/index';
import { mapOptions } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

export const useTypeEventSelect = () => {
  // TODO => должна быть ручка api а не хардкожен в массиве
  const marksCarList = mapOptions(AppConstants.eventTypesList, (data) => [data.label, data.value]);
  return { marksCarList };
};
