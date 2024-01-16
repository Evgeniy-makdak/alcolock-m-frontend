import Formatters from '@shared/utils/formatters';

export const getAlcolocksRowsTemplate = (item) => ({
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

export const getCarsRowsTemplate = (car) => ({
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

export const getUsersRowsTemplate = (item) => {
  return {
    id: item.id,
    values: [
      {
        value: Formatters.nameFormatter(item),
      },
      {
        value: item.email,
      },
      {
        value: !!item.driver?.vehicleAllotments?.length ? (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            {item.driver.vehicleAllotments.map((vehicleAllotment) => (
              <span key={vehicleAllotment.id}>
                {Formatters.carNameFormatter(vehicleAllotment.vehicle)}
              </span>
            ))}
          </span>
        ) : (
          '-'
        ),
      },
    ],
  };
};
