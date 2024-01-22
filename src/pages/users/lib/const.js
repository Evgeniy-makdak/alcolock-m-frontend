import { AppConstants } from '@app';
import { Formatters } from '@shared/utils/formatters';

import { UsersSortTypes } from '../model/effects';
import style from '../ui/Users.module.scss';

export const HEADERS = [
  {
    label: 'Пользователь',
    sortType: UsersSortTypes.byName,
  },
  {
    label: 'Почта',
    sortType: UsersSortTypes.byEmail,
  },
  {
    label: 'Роли',
    style: {
      maxWidth: '401px',
      width: '401px',
    },
  },
  {
    label: 'Доступ',
    sortType: UsersSortTypes.byAccess,
  },
  {
    label: 'Дата регистрации',
    sortType: UsersSortTypes.byDate,
    style: {
      maxWidth: '201px',
      width: '201px',
    },
  },
];

export const getRowsTemplate = (user) => {
  return {
    id: user.id,
    values: [
      {
        value: Formatters.nameFormatter(user),
      },
      {
        value: user.email ?? '-',
      },
      {
        value: (
          <div className={style.wrapperName}>
            {user.groupMembership?.map((group) => {
              return (
                <span key={group.id} className={style.roleSpan}>
                  {group.group.name}
                </span>
              );
            }) ?? '-'}
          </div>
        ),
        style: {
          maxWidth: '401px',
          width: '401px',
        },
      },
      {
        value:
          AppConstants.accessList.find((access) => access.value === user.disabled)?.label ?? '-',
        style: {
          maxWidth: '201px',
          width: '201px',
        },
      },
      {
        value: Formatters.formatISODate(user.createdAt),
        style: {
          maxWidth: '201px',
          width: '201px',
        },
      },
    ],
  };
};

export const DELETE_POPUP_TITLE = 'Удаление пользователя';
export const getDeletePopupBody = (selectedItem) => {
  return (
    <p>
      Вы действительно хотите удалить пользователя <b>{selectedItem?.email}</b>?
    </p>
  );
};

export const ADD_POPUP_TITLE = 'Добавление пользователя';
export const EDIT_POPUP_TITLE = 'Редактирование пользователя';
