/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { type Location, type NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import type { AxiosError } from 'axios';

import { appStore } from '@shared/model/app_store/AppStore';
import { setStore } from '@shared/model/store/localStorage';
import type { IAccount, IError } from '@shared/types/BaseQueryTypes';

import { RoutePaths } from '..';
import { useAppApi } from '../api/useAppApi';

setStore(window.localStorage);

type OnFetchDataHandlingArgs = {
  isLoading: boolean;
  error: AxiosError<IError, any>;
  user: IAccount;
  refetch: () => void;
  navigate: NavigateFunction;
  location: Location;
};

const onFetchDataHandling = ({
  isLoading,
  error,
  user,
  refetch,
  navigate,
  location,
}: OnFetchDataHandlingArgs) => {
  if (isLoading) return;
  if (!error && !user) {
    refetch();
    return;
  }
  const isAdmin = (user?.permissions || []).includes('SYSTEM_GLOBAL_ADMIN');
  if (user) {
    appStore.setState({
      auth: true,
      email: user?.email,
      isAdmin: isAdmin,
    });
  }
  if (location?.pathname === '/' && !error) {
    navigate(RoutePaths.events);
  }
};

export const useApp = () => {
  const { isLoading, user, error, refetch } = useAppApi();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onFetchDataHandling({
      isLoading,
      error,
      user,
      refetch,
      location,
      navigate,
    });
  }, [error, user]);

  return { isLoading };
};
