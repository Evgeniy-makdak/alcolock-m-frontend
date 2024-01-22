import { TimeCell } from '@entities/time_cell';
import { Formatters } from '@shared/utils/formatters';
import { SearchMethods } from '@shared/utils/global_methods';

import { AutoServiceSortTypes } from '../model/effects';

export const HEADERS = [
  {
    label: 'Дата',
    sortType: AutoServiceSortTypes.byDate,
    style: {
      maxWidth: '170px',
      width: '170px',
    },
  },
  {
    label: 'Серийный номер',
    sortType: AutoServiceSortTypes.bySerial,
  },
  {
    label: 'Установлен на ТС',
    sortType: AutoServiceSortTypes.byCar,
  },
  {
    label: 'Инициатор',
    sortType: AutoServiceSortTypes.byDriver,
  },
  {
    label: 'Состояние',
    // sortType: AutoServiceSortTypes.byState
  },
  {
    label: 'Процесс',
    // sortType: AutoServiceSortTypes.byProcess,
    style: {
      maxWidth: '120px',
      width: '120px',
    },
  },
  {
    label: 'Истекает',
    style: {
      maxWidth: '120px',
      width: '120px',
    },
  },
];

export const getRowsTemplate = (item, updateInfo) => {
  const lastEvent = SearchMethods.findMostRecentEvent(item.events);
  const requestType = SearchMethods.findFirstRequestEvent(item.events)?.eventType;
  const isAcknowledged = !!(item.events ?? []).find(
    (event) => event.eventType === 'APP_ACKNOWLEDGED',
  );

  return {
    id: item.id,
    values: [
      {
        value: Formatters.formatISODate(item.createdAt),
        style: {
          maxWidth: '170px',
          width: '170px',
        },
      },
      {
        value: item.device?.serialNumber ?? '-',
      },
      {
        value: item.vehicleRecord ? Formatters.carNameFormatter(item.vehicleRecord) : '-',
      },
      {
        value: Formatters.nameFormatter(item.createdBy),
      },
      {
        value:
          lastEvent?.eventType === 'SERVER_REQUEST'
            ? 'Ожидание водителя'
            : lastEvent?.eventType === 'APP_REQUEST'
              ? 'Ожидание оператора'
              : lastEvent?.eventType === 'REJECTED'
                ? isAcknowledged
                  ? 'Оператор отклонил'
                  : requestType === 'SERVER_REQUEST'
                    ? 'Водитель отклонил'
                    : 'Оператор отклонил'
                : lastEvent?.eventType === 'ACCEPTED'
                  ? isAcknowledged
                    ? 'Оператор подтвердил'
                    : requestType === 'SERVER_REQUEST'
                      ? 'Водитель подтвердил'
                      : 'Оператор подтвердил'
                  : lastEvent?.eventType === 'OFFLINE_DEACTIVATION' ||
                      lastEvent?.eventType === 'OFFLINE_ACTIVATION'
                    ? 'Офлайн-переключение'
                    : '-',
      },
      {
        value:
          item.type === 'SERVICE_MODE_ACTIVATE'
            ? 'Включение'
            : item.type === 'SERVICE_MODE_DEACTIVATE'
              ? 'Выключение'
              : '-',
      },
      {
        value: (
          <TimeCell
            key={item.id}
            time={lastEvent?.eventType !== 'REJECTED' ? item.finishedAt : null}
            updateInfo={updateInfo}
            id={item.id}
          />
        ),
        style: {
          maxWidth: '120px',
          width: '120px',
        },
      },
    ],
  };
};
