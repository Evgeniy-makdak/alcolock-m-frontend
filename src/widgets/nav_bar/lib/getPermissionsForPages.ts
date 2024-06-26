import {
  getPermissionsNumbersEntities,
  permissionsListIncludes,
} from '@features/role_add_change_form';
import { Permissions, PermissionsStatus } from '@shared/config/permissionsEnums';
import { RoutePaths } from '@shared/config/routePathsEnum';

import type { TypeNavLink } from '../config/const';
import type { TypeNavPath } from './../config/const';

// TODO => поменять всю работу с доступами когда на бэке поменяется структура доступов
export const getPermissionsForPages = (permissionForThisPage: HasPermissionForThisPageReturn) => {
  return function (path: TypeNavLink) {
    return permissionForThisPage[path.path];
  };
};
// TODO => поменять всю работу с доступами когда на бэке поменяется структура доступов
const hasNoZeroPermissions = (statuses: PermissionsStatus[]) => {
  return Math.max(...statuses) > PermissionsStatus.NO_PERMISSION;
};

type HasPermissionForThisPageReturn = Partial<{
  [key in TypeNavPath]: boolean;
}>;
// TODO => поменять всю работу с доступами когда на бэке поменяется структура доступов
export const hasPermissionForThisPage = (
  permissionsList: Permissions[],
): HasPermissionForThisPageReturn => {
  const routerPermissions = {
    [RoutePaths.events]: true,
    [RoutePaths.users]: true,
    [RoutePaths.roles]: true,
    [RoutePaths.groups]: true,
    [RoutePaths.tc]: true,
    [RoutePaths.alkozamki]: true,
    [RoutePaths.autoService]: true,
    [RoutePaths.attachments]: true,
  };
  if (!permissionsList) {
    return routerPermissions;
  }
  const permissionsIncludes = permissionsListIncludes(permissionsList);
  const isGlobalAdmin = permissionsIncludes(Permissions.SYSTEM_GLOBAL_ADMIN);
  if (isGlobalAdmin) {
    return routerPermissions;
  }
  const permission = getPermissionsNumbersEntities(permissionsList);
  routerPermissions[RoutePaths.events] = hasNoZeroPermissions(permission.eventPermission);
  routerPermissions[RoutePaths.users] = hasNoZeroPermissions(permission.userPermission);
  routerPermissions[RoutePaths.roles] = hasNoZeroPermissions(permission.rolePermission);
  routerPermissions[RoutePaths.groups] = false;
  routerPermissions[RoutePaths.tc] = hasNoZeroPermissions(permission.carPermission);
  routerPermissions[RoutePaths.alkozamki] = hasNoZeroPermissions(permission.devicePermission);
  routerPermissions[RoutePaths.autoService] = permission.devicePermission.includes(
    PermissionsStatus.EDIT,
  );
  routerPermissions[RoutePaths.attachments] = hasNoZeroPermissions(
    permission.attachmentsPermission,
  );
  return routerPermissions;
};
