// TODO => убрать связь с чужой страницей
import { CarsSortTypes } from '@pages/vehicles/model/effects';

// TODO => убрать связь с чужой страницей
export const ADD_CAR_POPUP_TITLE = 'Добавить ТС в группу';
// TODO => сделать общую функцию для генерации заголовков таблиц с фильтрами
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
