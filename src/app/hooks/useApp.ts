import { useEffect } from 'react';
import { type Location, type NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import type { AxiosError } from 'axios';

import { Permissions } from '@shared/const/config';
import { appStore } from '@shared/model/app_store/AppStore';
import { setStore } from '@shared/model/store/localStorage';
import type { IAccount, IError } from '@shared/types/BaseQueryTypes';

import { RoutePaths } from '..';
import { useAppApi } from '../api/useAppApi';

setStore(window.localStorage);

type OnFetchDataHandlingArgs = {
  isLoading: boolean;
  error: AxiosError<IError>;
  user: IAccount;
  navigate: NavigateFunction;
  location: Location;
  auth: boolean;
};

const onFetchDataHandling = ({
  isLoading,
  error,
  user,
  navigate,
  location,
  auth,
}: OnFetchDataHandlingArgs) => {
  if (isLoading) return;
  const isAdmin = (user?.permissions || []).includes(Permissions.SYSTEM_GLOBAL_ADMIN);
  if (user) {
    appStore.setState({
      auth: true,
      email: user?.email,
      isAdmin: isAdmin,
    });
  }
  if (location?.pathname === '/' && !error && !isLoading && user) {
    navigate(RoutePaths.events);
  } else if (error || (!auth && !user)) {
    navigate(RoutePaths.auth);
  }
};

export const useApp = () => {
  const { auth, isAdmin } = appStore.getState();
  const { isLoading, user, error } = useAppApi(isAdmin);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onFetchDataHandling({
      isLoading,
      error,
      user,
      location,
      navigate,
      auth,
    });
  }, [error, user]);

  return { isLoading, auth };
};
