import { GroupsSortTypes } from '../model/effects';

export const HEADERS = [
  {
    label: 'Название группы',
    sortType: GroupsSortTypes.byName,
  },
  {
    label: 'Кем создана',
    sortType: GroupsSortTypes.byUser,
  },
  {
    label: 'Дата создания',
    sortType: GroupsSortTypes.byDate,
    style: {
      maxWidth: '201px',
      width: '201px',
    },
  },
];

export const DELETE_POPUP_TITLE = 'Удаление группы';

export const ADD_POPUP_TITLE = 'Добавление группы';
export const EDIT_POPUP_TITLE = 'Редактирование названия группы';
