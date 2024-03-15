import { AppConstants } from '@app/index';

export const colorSelectValueFormatter = (value: string) => {
  return AppConstants.carColorsList.filter((item) => item.value === value);
};

export const typeSelectValueFormatter = (value: string) =>
  AppConstants.carTypesList.filter((item) => item.value === value);
