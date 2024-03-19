import { useNavigate } from 'react-router-dom';

import { RoutePaths } from '@app/index';
import { permissionsMapper } from '@features/role_add_change_form';

import { useNavBarApi } from '../api/useNavBarApi';
import type { TypeNavLink } from '../lib/const';

export const useNavBar = () => {
  const { userData, isLoadingAccountData, length, error } = useNavBarApi();
  const permission = permissionsMapper(userData?.permissions);
  const navigate = useNavigate();

  const permissionsFilter = (item: TypeNavLink) => {
    const isAdmin = (userData?.permissions || []).includes('SYSTEM_GLOBAL_ADMIN');
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
  if (error) {
    error?.status === 401 && navigate(RoutePaths.auth);
  }
  return { userData, isLoadingAccountData, length, permissionsFilter };
};
