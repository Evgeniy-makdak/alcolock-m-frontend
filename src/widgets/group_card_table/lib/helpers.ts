import { Car } from '@shared/utils/formatters';

export const getCarsRowsTemplate = (car: Car) => ({
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
