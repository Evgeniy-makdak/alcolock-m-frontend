import type { ICar } from '@shared/api/baseTypes';
import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

export const mapOptions = (cars: ICar[]): Value[] => {
  return cars.map((car) => ({
    label: `${car.model} ${car.registrationNumber}`,
    value: car.id,
  }));
};
