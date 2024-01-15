import AppConstants from '../../../internal/app_constants';
import { AlcolocksSortTypes } from '../../../internal/effector/alkozamki/effects';
import Formatters from '../../../internal/utils/formatters';

export const HEADERS = [
  {
    label: 'Наименование',
    sortType: AlcolocksSortTypes.byName,
  },
  {
    label: 'Серийный номер',
    sortType: AlcolocksSortTypes.bySerial,
  },
  {
    label: 'Установлен на ТС',
    sortType: AlcolocksSortTypes.byCar,
  },
  {
    label: 'Режим работы',
    sortType: AlcolocksSortTypes.byMode,
  },
  {
    label: 'Кем привязан',
    sortType: AlcolocksSortTypes.byUser,
  },
  {
    label: 'Дата установки',
    sortType: AlcolocksSortTypes.byDate,
    style: {
      maxWidth: '201px',
      width: '201px',
    },
  },
];

export const getRowsTemplate = (item) => ({
  id: item.id,
  values: [
    {
      value: item?.name ?? '-',
      style: {
        background:
          item.service_status === AppConstants.ServiceModeTypes.pending_by_system
            ? 'rgba(255, 0, 0, 0.20)'
            : item.service_status === AppConstants.ServiceModeTypes.pending_by_driver
              ? 'rgba(239, 108, 0, 0.20)'
              : item.service_status === AppConstants.ServiceModeTypes.driver_accept
                ? 'rgba(46, 125, 50, 0.20)'
                : 'transparent',
      },
    },
    {
      value: item.serialNumber ?? '-',
      style: {
        background:
          item.service_status === AppConstants.ServiceModeTypes.pending_by_system
            ? 'rgba(255, 0, 0, 0.20)'
            : item.service_status === AppConstants.ServiceModeTypes.pending_by_driver
              ? 'rgba(239, 108, 0, 0.20)'
              : item.service_status === AppConstants.ServiceModeTypes.driver_accept
                ? 'rgba(46, 125, 50, 0.20)'
                : 'transparent',
      },
    },
    {
      value: item.vehicleBind?.vehicle
        ? `${item.vehicleBind.vehicle.manufacturer} ${item.vehicleBind.vehicle.model} ${item.vehicleBind.vehicle.registrationNumber}`
        : '-',
      style: {
        background:
          item.service_status === AppConstants.ServiceModeTypes.pending_by_system
            ? 'rgba(255, 0, 0, 0.20)'
            : item.service_status === AppConstants.ServiceModeTypes.pending_by_driver
              ? 'rgba(239, 108, 0, 0.20)'
              : item.service_status === AppConstants.ServiceModeTypes.driver_accept
                ? 'rgba(46, 125, 50, 0.20)'
                : 'transparent',
      },
    },
    {
      value: AppConstants.alkolockWorkModes.find((mode) => mode.value === item.mode)?.label ?? '-',
      style: {
        background:
          item.service_status === AppConstants.ServiceModeTypes.pending_by_system
            ? 'rgba(255, 0, 0, 0.20)'
            : item.service_status === AppConstants.ServiceModeTypes.pending_by_driver
              ? 'rgba(239, 108, 0, 0.20)'
              : item.service_status === AppConstants.ServiceModeTypes.driver_accept
                ? 'rgba(46, 125, 50, 0.20)'
                : 'transparent',
      },
    },
    {
      value: Formatters.nameFormatter(item.createdBy),
      style: {
        background:
          item.service_status === AppConstants.ServiceModeTypes.pending_by_system
            ? 'rgba(255, 0, 0, 0.20)'
            : item.service_status === AppConstants.ServiceModeTypes.pending_by_driver
              ? 'rgba(239, 108, 0, 0.20)'
              : item.service_status === AppConstants.ServiceModeTypes.driver_accept
                ? 'rgba(46, 125, 50, 0.20)'
                : 'transparent',
      },
    },
    {
      value: Formatters.formatISODate(item.createdAt),
      style: {
        maxWidth: '201px',
        width: '201px',
        background:
          item.service_status === AppConstants.ServiceModeTypes.pending_by_system
            ? 'rgba(255, 0, 0, 0.20)'
            : item.service_status === AppConstants.ServiceModeTypes.pending_by_driver
              ? 'rgba(239, 108, 0, 0.20)'
              : item.service_status === AppConstants.ServiceModeTypes.driver_accept
                ? 'rgba(46, 125, 50, 0.20)'
                : 'transparent',
      },
    },
  ],
});

export const DELETE_POPUP_TITLE = 'Удаление Алкозамка';
export const getDeletePopupBody = (selectedItem) => {
  if (selectedItem?.vehicle) {
    return (
      <p>
        Вы действительно хотите удалить Алкозамок{' '}
        <b>
          {selectedItem?.name}, {selectedItem?.serialNumber}
        </b>{' '}
        с привязанным к нему ТС{' '}
        <b>
          {selectedItem?.vehicle.manufacturer} {selectedItem?.vehicle.model}, {selectedItem?.vehicle.registrationNumber},{' '}
          {selectedItem?.vehicle.year}
        </b>
        ?
      </p>
    );
  } else {
    return (
      <p>
        Вы действительно хотите удалить Алкозамок{' '}
        <b>
          {selectedItem?.name}, {selectedItem?.serialNumber}
        </b>
        ?
      </p>
    );
  }
};

export const ADD_POPUP_TITLE = 'Добавление Алкозамка';
export const EDIT_POPUP_TITLE = 'Редактирование Алкозамка';
