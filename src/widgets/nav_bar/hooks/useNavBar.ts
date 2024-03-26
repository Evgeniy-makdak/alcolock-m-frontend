import { RoutePaths } from '@app/index';
import { permissionsMapper } from '@features/role_add_change_form';
import { Permissions } from '@shared/const/config';

import { useNavBarApi } from '../api/useNavBarApi';
import type { TypeNavLink } from '../lib/const';

export const useNavBar = () => {
  const { userData, isLoadingAccountData, length } = useNavBarApi();
  const permission = permissionsMapper(userData?.permissions);

  const permissionsFilter = (item: TypeNavLink) => {
    const isAdmin = (userData?.permissions || []).includes(Permissions.SYSTEM_GLOBAL_ADMIN);
    if (item.path === RoutePaths.groups || item.path === RoutePaths.roles) {
      return isAdmin;
    } else if (item.path === RoutePaths.users) {
      return !!permission.users;
    } else if (item.path === RoutePaths.tc) {
      return !!permission.cars;
    } else if (item.path === RoutePaths.alkozamki) {
      return !!permission.alcolocks;
    } else if (item.path === RoutePaths.attachments) {
      return !!permission.attachments;
    } else if (item.path === RoutePaths.autoService) {
      return !!permission.alkozamki || isAdmin;
    } else {
      return true;
    }
  };
  return { userData, isLoadingAccountData, length, permissionsFilter };
};
