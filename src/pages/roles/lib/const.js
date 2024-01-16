import AppConstants from '@app/lib/app_constants';
import Formatters from '@shared/utils/formatters';

import { RolesSortTypes } from '../model/effects';

export const HEADERS = [
  {
    label: 'Роль',
    sortType: RolesSortTypes.byRole,
  },
  {
    label: 'Управление пользователями',
    // sortType: RolesSortTypes.byUser
  },
  {
    label: 'Управление ТС',
    // sortType: RolesSortTypes.byCar
  },
  {
    label: 'Управление алкозамками',
    // sortType: RolesSortTypes.byAlkozamok
  },
  {
    label: 'Управление привязками',
    // sortType: RolesSortTypes.byAttachment
  },
];

export const getRowsTemplate = (item) => {
  const rolePermissions = Formatters.normalizePermissions(item.userGroupPermissions);

  return {
    id: item.id,
    disabledAction: item.systemGenerated,
    values: [
      {
        value: item.name,
      },
      {
        value:
          AppConstants.permissionsList.find((perm) => perm.value === rolePermissions.user_control)
            ?.label ?? '-',
      },
      {
        value:
          AppConstants.permissionsList.find((perm) => perm.value === rolePermissions.car_control)
            ?.label ?? '-',
      },
      {
        value:
          AppConstants.permissionsList.find(
            (perm) => perm.value === rolePermissions.alkozamki_control,
          )?.label ?? '-',
      },
      {
        value:
          AppConstants.permissionsList.find(
            (perm) => perm.value === rolePermissions.attachments_control,
          )?.label ?? '-',
      },
    ],
  };
};

export const DELETE_POPUP_TITLE = 'Удаление роли';
export const getDeletePopupBody = (selectedItem) => {
  return (
    <p>
      Вы действительно хотите удалить роль <b>{selectedItem?.name}</b>?
    </p>
  );
};

export const ADD_POPUP_TITLE = 'Добавление роли';
export const EDIT_POPUP_TITLE = 'Редактирование роли';
