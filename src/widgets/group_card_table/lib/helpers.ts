import { ICar } from '@shared/api/baseTypes';

export const getCarsRowsTemplate = (car: ICar) => ({
  id: car.id,
  values: [
    {
      value: car.manufacturer ?? '-',
    },
    {
      value: car.model ?? '-',
    },
    {
      value: car.vin ?? '-',
    },
    {
      value: car.registrationNumber ?? '-',
      style: {
        maxWidth: '288px',
        width: '288px',
      },
    },
  ],
});
