import { Car, Formatters } from '@shared/utils/formatters';

export const getAlcolocksRowsTemplate = (item: {
  id?: string;
  name?: string;
  serialNumber?: string;
  vehicleBind?: { vehicle?: Car };
}) => ({
  id: item.id,
  values: [
    {
      value: item.name ?? '-',
    },
    {
      value: item.serialNumber ?? '-',
    },
    {
      value: Formatters.carNameFormatter(item.vehicleBind?.vehicle),
    },
  ],
});
