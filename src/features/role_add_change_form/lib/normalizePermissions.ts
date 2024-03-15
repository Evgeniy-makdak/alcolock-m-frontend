import type { IPermissionsString, IUserGroupPermission } from '@shared/types/BaseQueryTypes';

import { Entitys, UserPermissionsTypes } from './const';

export type NormalizePermissions = {
  user_control: number;
  car_control: number;
  alkozamki_control: number;
  attachments_control: number;
};

export function normalizePermissions(
  userGroupPermissions: IUserGroupPermission[],
): NormalizePermissions {
  const rolePermissions = {
    user_control: 3,
    car_control: 3,
    alkozamki_control: 3,
    attachments_control: 3,
  };

  if (!(userGroupPermissions ?? []).length) return rolePermissions;
  userGroupPermissions.forEach((permission) => {
    const permissionNameParts = permission.permission.name.split('_');
    const permissionArea = permissionNameParts[1];
    const availableMethod = permissionNameParts[permissionNameParts.length - 1];

    switch (availableMethod) {
      case 'CREATE':
        if (permissionArea === Entitys.DEVICE) {
          rolePermissions.alkozamki_control = 1;
        } else if (permissionArea === Entitys.VEHICLE) {
          rolePermissions.car_control = 1;
        } else if (permissionArea === Entitys.USER) {
          rolePermissions.user_control = 1;
        }
        break;
      case 'READ':
        if (permissionArea === Entitys.DEVICE) {
          rolePermissions.alkozamki_control = 2;
        } else if (permissionArea === Entitys.VEHICLE) {
          rolePermissions.car_control = 2;
        } else if (permissionArea === Entitys.USER) {
          rolePermissions.user_control = 2;
        }
        break;
    }
  });

  if (rolePermissions.user_control === 1 && rolePermissions.car_control === 1) {
    rolePermissions.attachments_control = 1;
  } else if (rolePermissions.user_control !== 3 && rolePermissions.car_control !== 3) {
    rolePermissions.attachments_control = 2;
  }

  return rolePermissions;
}

const permissionsNormalize = (permissionsList: IPermissionsString[], entity: Entitys) => {
  if (!permissionsList) return null;
  if (permissionsList.includes(`PERMISSION_${entity}_CREATE`)) {
    return UserPermissionsTypes.CREATE;
  } else if (permissionsList.includes(`PERMISSION_${entity}_READ`)) {
    return UserPermissionsTypes.READ;
  } else {
    return null;
  }
};

export const permissionsMapper = (permissionsList: IPermissionsString[]) => {
  const permissions: {
    attachments: null | UserPermissionsTypes;
    users: null | UserPermissionsTypes;
    cars: null | UserPermissionsTypes;
    alcolocks: null | UserPermissionsTypes;
    alkozamki: null | UserPermissionsTypes;
  } = {
    users: permissionsNormalize(permissionsList, Entitys.USER),
    cars: permissionsNormalize(permissionsList, Entitys.VEHICLE),
    attachments: null,
    alkozamki: null,
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
