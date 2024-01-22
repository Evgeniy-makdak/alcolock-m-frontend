import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthStatus, appStore } from '@app/model/store';
import { getUserData } from '@features/menu_button/model/effects';
import { cookieManager } from '@shared/utils/cookie_manager';

import { RoutePaths } from '..';

export const useApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = appStore.appAuthStatus.useValue() === AuthStatus.auth;

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
    if (!isAuth) {
      navigate(RoutePaths.auth);
    } else {
      if (location?.pathname === '/') navigate(RoutePaths.events);
    }
  }, [isAuth]);
};
