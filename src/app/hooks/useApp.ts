import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthStatus, appStore } from '@app/model/store';
import { getUserData } from '@features/menu_button/model/effects';
import { setStore } from '@shared/model/store/localStorage';
import { cookieManager } from '@shared/utils/cookie_manager';

import { RoutePaths } from '..';

setStore(window.localStorage);

export const useApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = appStore.appAuthStatus.useValue() === AuthStatus.auth;
  const isLoadingApp = appStore.appLoading.useValue();
  const token = appStore.appToken.useValue();

  useEffect(() => {
    const bar = token ?? cookieManager.get('bearer');
    getUserData({
      token: bar,
    }).catch((err) => {
      console.log('getUserData error', err?.response);
    });
  }, [token]);

  useEffect(() => {
    if (!isAuth && !isLoadingApp) {
      navigate(RoutePaths.auth);
    } else {
      if (location?.pathname === '/') navigate(RoutePaths.events);
    }
  }, [isAuth, isLoadingApp]);
};
