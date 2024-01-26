// TODO => убрать связь с чужой страницей
import { UsersSortTypes } from '@pages/users/model/effects';

export const ADD_USER_POPUP_TITLE = 'Добавить пользователей в группу';
// TODO => сделать общую функцию для генерации заголовков таблиц с фильтрами
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
