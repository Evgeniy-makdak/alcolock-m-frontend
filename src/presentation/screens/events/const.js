import AppConstants from '../../../internal/app_constants';
import { EventsSortTypes } from '../../../internal/effector/events/effects';
import Formatters from '../../../internal/utils/formatters';

export const HEADERS = [
  {
    label: 'Дата',
    sortType: EventsSortTypes.byDate,
    style: {
      maxWidth: '201px',
      width: '201px',
    },
  },
  {
    label: 'Инициатор',
    sortType: EventsSortTypes.byUserName,
  },
  {
    label: 'ТС',
    sortType: EventsSortTypes.byCarMake,
  },
  {
    label: 'Номер',
    sortType: EventsSortTypes.byCarLicense,
  },
  {
    label: 'Тип события',
    sortType: EventsSortTypes.byEventType,
  },
];

export const getRowsTemplate = (item) => {
  return {
    id: item.id,
    values: [
      {
        value: Formatters.formatISODate(item.createdAt),
        style: {
          maxWidth: '201px',
          width: '201px',
        },
      },
      {
        value: Formatters.nameFormatter(item.createdBy),
      },
      {
        value: item.vehicleRecord ? Formatters.carNameFormatter(item.vehicleRecord, true) : '-',
      },
      {
        value: item.vehicleRecord?.registrationNumber ?? '-',
      },
      {
        value: AppConstants.eventTypesList.find((type) => type.value === item.type)?.label ?? '-',
      },
    ],
  };
};
