import { UserPermissionsTypes } from '@features/menu_button';
import { Entitys } from '@features/menu_button/lib/const';

const permissionsNormalize = (permissionsList: string[], entity: string) => {
  if ((permissionsList || [])?.includes(`PERMISSION_${entity}_CREATE`)) {
    return UserPermissionsTypes.CREATE;
  } else if ((permissionsList || [])?.includes(`PERMISSION_${entity}_READ`)) {
    return UserPermissionsTypes.READ;
  } else {
    return null;
  }
};

export const permissionsMapper = (permissionsList: string[]) => {
  const permissions: { [key: string]: null | string } = {
    users: permissionsNormalize(permissionsList, Entitys.USER),
    cars: permissionsNormalize(permissionsList, Entitys.VEHICLE),
    attachments: null,
    alcolocks: permissionsNormalize(permissionsList, Entitys.DEVICE),
  };

  if (
    permissions.users === UserPermissionsTypes.CREATE &&
    permissions.cars === UserPermissionsTypes.CREATE
  ) {
    permissions.attachments = UserPermissionsTypes.CREATE;
  } else if (!!permissions.users && !!permissions.cars) {
    permissions.attachments = UserPermissionsTypes.READ;
  }

  return permissions;
};
