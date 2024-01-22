import { AlcolocksSortTypes } from '@pages/alkozamki/model/effects';
import { UsersSortTypes } from '@pages/users/model/effects';
import { CarsSortTypes } from '@pages/vehicles/model/effects';

export const ADD_ALCOLOCK_POPUP_TITLE = 'Добавить алкозамки в группу';

export const ALCOLOCKS_TABLE_HEADERS = [
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
];

export const ADD_CAR_POPUP_TITLE = 'Добавить ТС в группу';
export const ADD_USER_POPUP_TITLE = 'Добавить пользователей в группу';

export const CARS_TABLE_HEADERS = [
  {
    label: 'Марка',
    sortType: CarsSortTypes.byMake,
  },
  {
    label: 'Модель',
    sortType: CarsSortTypes.byModel,
  },
  {
    label: 'VIN',
    sortType: CarsSortTypes.byVin,
  },
  {
    label: 'Государственный номер',
    sortType: CarsSortTypes.byLicense,
    style: {
      maxWidth: '288px',
      width: '288px',
    },
  },
];

export const USERS_TABLE_HEADERS = [
  {
    label: 'Пользователь',
    sortType: UsersSortTypes.byName,
  },
  {
    label: 'Почта',
    sortType: UsersSortTypes.byEmail,
  },
  {
    label: 'Привязанные ТС',
  },
];
