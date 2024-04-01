import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { enqueueSnackbar } from 'notistack';

import { onFetchDataHandling } from '@app/lib/onFetchDataHandling';
import { Permissions } from '@shared/config/permissionsEnums';
import type { RoutePaths } from '@shared/config/routePathsEnum';
import { appStore } from '@shared/model/app_store/AppStore';
import { setStore } from '@shared/model/store/localStorage';
import { NAV_LINKS } from '@widgets/nav_bar/config/const';
import { hasPermissionForThisPage } from '@widgets/nav_bar/lib/getPermissionsForPages';

import { useAppApi } from '../api/useAppApi';

setStore(window.localStorage);

export const useApp = () => {
  const auth = appStore((state) => state.auth);
  const { isLoading, user, error } = useAppApi();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname as RoutePaths;
  // TODO => поменять всю работу с доступами когда на бэке поменяется структура доступов
  const permissionsPath = hasPermissionForThisPage(user?.permissions);
  // TODO => поменять всю работу с доступами когда на бэке поменяется структура доступов
  const array = Object.entries(permissionsPath).filter((perm) => perm[1] === true);
  const firstAvailableRouter = array[0][0];
  // TODO => поменять всю работу с доступами когда на бэке поменяется структура доступов
  useEffect(() => {
    if (isLoading || !user) return;
    if (user?.permissions.includes(Permissions.SYSTEM_GLOBAL_ADMIN)) return;
    const hasAccess = pathName in permissionsPath && permissionsPath[pathName];
    if (hasAccess) return;
    if (!hasAccess) {
      const pathDisplayName = NAV_LINKS.find((link) => link.path === pathName);
      enqueueSnackbar(`У вас нет доступа к странице "${pathDisplayName.name}"`, {
        variant: 'error',
      });
      navigate(firstAvailableRouter);
    }
  }, [pathName]);

  useEffect(() => {
    if (isLoading) return;
    onFetchDataHandling({
      error,
      user,
      location,
      navigate,
      auth,
      route: firstAvailableRouter,
    });
  }, [error, isLoading, user]);

  return { isLoading };
};
