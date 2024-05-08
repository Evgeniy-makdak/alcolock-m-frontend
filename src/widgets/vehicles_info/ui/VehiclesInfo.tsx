import type { FC } from 'react';

import { Info } from '@entities/info';
import type { ID } from '@shared/types/BaseQueryTypes';
import { Loader } from '@shared/ui/loader';

import { useVehiclesInfo } from '../hooks/useVehiclesInfo';

type VehiclesInfoProps = {
  selectedCarId: ID;
};

export const VehiclesInfo: FC<VehiclesInfoProps> = ({ selectedCarId }) => {
  const { isLoading, fields } = useVehiclesInfo(selectedCarId);

  return (
    <Loader isLoading={isLoading}>
      <Info fields={fields} />
    </Loader>
  );
};
