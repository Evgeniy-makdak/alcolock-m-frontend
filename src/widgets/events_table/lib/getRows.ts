import { useMemo } from 'react';

import type { GridRowsProp } from '@mui/x-data-grid';

import { AppConstants } from '@app/index';
import { type IDeviceAction } from '@shared/types/BaseQueryTypes';
import { Formatters } from '@shared/utils/formatters';

import { ValuesHeader } from './getColumns';

export const useGetRows = (data: IDeviceAction[]): GridRowsProp => {
  const mapData = (Array.isArray(data) ? data : []).map((item) => {
    return {
      id: item.id,
      [ValuesHeader.DATE]: Formatters.formatISODate(item.createdAt) ?? '-',
      [ValuesHeader.INTITIATOR]: Formatters.nameFormatter(item.createdBy) ?? '-',
      [ValuesHeader.TC]: item.vehicleRecord
        ? Formatters.carNameFormatter(item.vehicleRecord, true)
        : '-',
      [ValuesHeader.NUMBER_CAR]: item.vehicleRecord?.registrationNumber ?? '-',
      [ValuesHeader.TYPE_OF_EVENT]:
        AppConstants.eventTypesList.find((type) => type.value === item?.type)?.label ?? '-',
    };
  });

  const returnData = useMemo(() => mapData, [data]);
  return returnData;
};
