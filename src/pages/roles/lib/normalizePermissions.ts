import { Entitys } from '@features/menu_button/lib/const';

interface Permissions {
  permission: {
    name: string;
  };
}

export function normalizePermissions(userGroupPermissions: Permissions[]) {
  const rolePermissions = {
    user_control: 3,
    car_control: 3,
    alkozamki_control: 3,
    attachments_control: 3,
  };

  if ((userGroupPermissions ?? []).length) {
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
  } else {
    return rolePermissions;
  }
}
