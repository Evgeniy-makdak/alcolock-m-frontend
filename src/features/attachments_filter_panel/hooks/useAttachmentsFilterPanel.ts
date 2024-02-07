/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';

import { getStringFromArrayValues } from '@shared/lib/getStringFromArrayValues';

interface AttachmentsFilterPanel {
  driverId: string;
  carId: string;
  alcolocks: string;
  createLink: string;
  dateLink: string;
}

export interface Filters {
  userId: string;
  carsId: string;
}

export interface AttachmentsFilterPanelProps {
  listener: (filter: keyof Filters, value: string) => void;
}

export const useAttachmentsFilterPanel = ({ listener }: AttachmentsFilterPanelProps) => {
  const { register, setValue } = useForm<AttachmentsFilterPanel>();

  const onChangeDriver = (value: number[] | number) => {
    setValue('driverId', getStringFromArrayValues(value));
  };

  const onChangeCar = (value: number[] | number) => {
    setValue('carId', getStringFromArrayValues(value));
  };

  const onChangeAlcolocks = (value: number[] | number) => {
    setValue('alcolocks', getStringFromArrayValues(value));
  };

  const onChangeCreateLink = (value: number[] | number) => {
    setValue('createLink', getStringFromArrayValues(value));
  };

  const onChangeDateLink = (value: number[] | number) => {
    setValue('dateLink', getStringFromArrayValues(value));
  };

  return {
    register,
    onChangeDriver,
    onChangeCar,
    onChangeAlcolocks,
    onChangeCreateLink,
    onChangeDateLink,
  };
};
