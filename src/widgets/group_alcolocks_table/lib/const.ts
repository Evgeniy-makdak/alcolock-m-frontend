// TODO => убрать связь с чужой страницей
import { AlcolocksSortTypes } from '@pages/alkozamki/model/effects';

export const ADD_ALCOLOCK_POPUP_TITLE = 'Добавить алкозамки в группу';

// TODO => сделать общую функцию для генерации заголовков таблиц с фильтрами
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
