import { AppConstants } from '@app/index';

export const colorSelectValueFormatter = (value: string) => {
  return AppConstants.carColorsList.find((item) => item.value === value) ?? null;
};

export const typeSelectValueFormatter = (value: string) =>
  AppConstants.carTypesList.find((item) => item.value === value) ?? null;
