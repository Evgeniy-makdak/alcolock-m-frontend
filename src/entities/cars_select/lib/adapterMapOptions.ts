import type { ICar } from '@shared/types/BaseQueryTypes';
import { Formatters } from '@shared/utils/formatters';

export const adapterMapOptions = (car: ICar): [string, number | string] => {
  return [Formatters.carNameFormatter(car), car.id];
};
