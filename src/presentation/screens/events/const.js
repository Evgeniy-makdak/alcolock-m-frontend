import Formatters from "../../../internal/utils/formatters";
import {EventsSortTypes} from "../../../internal/effector/events/effects";
import AppConstants from "../../../internal/app_constants";

export const HEADERS = [
  {
    label: 'Дата',
    sortType: EventsSortTypes.byDate,
    style: {
      maxWidth: '201px',
      width: '201px',
    }
  },
  {
    label: 'Водитель',
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
]

export const getRowsTemplate = (item) => {
  return {
    id: item.id,
    values: [
      {
        value: Formatters.formatISODate(item.createdAt),
        style: {
          maxWidth: '201px',
          width: '201px',
        }
      },
      {
        value: (item.events ?? [])[0] && (item.events ?? [])[0].userRecord
          ? Formatters.nameFormatter(item.events[0].userRecord)
          : '-'
      },
      {
        value: item.vehicleRecord
          ? Formatters.carNameFormatter(item.vehicleRecord, true)
          : '-',
      },
      {
        value: item.vehicleRecord?.registrationNumber ?? '-',
      },
      {
        value: AppConstants.eventTypesList.find(type => type.value === item.type)?.label ?? '-'
      }
    ]
  }
}
