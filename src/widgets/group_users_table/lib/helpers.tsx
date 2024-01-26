import { Formatters, User } from '@shared/utils/formatters';

export const getUsersRowsTemplate = (item: User) => {
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
        value: item.driver?.vehicleAllotments?.length ? (
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
