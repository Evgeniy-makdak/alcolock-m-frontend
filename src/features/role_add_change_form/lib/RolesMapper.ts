import { AppConstants } from '@app/index';
import type { CreateRoleData, IPermissionsString, IRole } from '@shared/types/BaseQueryTypes';

import { Entitys } from './const';
import type { NormalizePermissions } from './normalizePermissions';
import { normalizePermissions } from './normalizePermissions';
import type { Form } from './validate';

export class RolesMapper {
  static toApi(data: Form): CreateRoleData {
    const userPermissions = this.getPermissions(Entitys.USER, Number(data.usersPermission));
    const devicesPermissions = this.getPermissions(Entitys.DEVICE, Number(data.alkolockPermission));
    const carPermissions = this.getPermissions(Entitys.VEHICLE, Number(data.carsPermission));

    return {
      name: data.name,
      permissions: [...userPermissions, ...devicesPermissions, ...carPermissions],
    };
  }

  static fromApi(data: IRole) {
    const rolesPermissions = normalizePermissions(data.userGroupPermissions);

    return {
      role: data.name,
      ...rolesPermissions,
    };
  }

  static getPermissions(entity: Entitys, value: number): IPermissionsString[] {
    const result: IPermissionsString[] = [];

    if (value === 1) {
      result.push(`PERMISSION_${entity}_CREATE`);
    } else if (value === 2) {
      result.push(`PERMISSION_${entity}_READ`);
    }

    return result;
  }

  static getPermissionForForm(data: NormalizePermissions) {
    const permissionsUser = AppConstants.permissionsList.find(
      (perm) => perm.value === data.user_control,
    );
    const permissionsTC = AppConstants.permissionsList.find(
      (perm) => perm.value === data.car_control,
    );

    const permissionsAlkolocks = AppConstants.permissionsList.find(
      (perm) => perm.value === data.alkozamki_control,
    );
    const permissionsAttachments = AppConstants.permissionsList.find(
      (perm) => perm.value === data.attachments_control,
    );
    return { permissionsUser, permissionsTC, permissionsAlkolocks, permissionsAttachments };
  }
}
