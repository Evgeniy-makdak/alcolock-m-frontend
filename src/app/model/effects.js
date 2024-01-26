import { createEffect } from 'effector';

import { authErrorState } from '@pages/authorization/model/store';
import { cookieManager } from '@shared/utils/cookie_manager';

import { AuthenticateApi } from '../api/authenticate_api';
import { RoutePaths } from '../lib/route_paths';
import {
  AuthStatus,
  appAuthStatusState,
  appTokenState,
  isAuthorization,
  refreshTokenState,
} from './store';

export const onAuthorization = createEffect((payload) => {
  isAuthorization.setState(true);
  const { data, navigate } = payload;

  const { promise } = AuthenticateApi.auth(data);

  return promise
    .then(({ res }) => {
      if (res.idToken) {
        cookieManager.set('bearer', res.idToken);
        appTokenState.setState(res.idToken);
        if (res.refreshToken) {
          cookieManager.set('refresh', res.refreshToken);
          refreshTokenState.setState(res.refreshToken);
        }

        appAuthStatusState.setState(AuthStatus.auth);
        navigate(RoutePaths.events);
      }
    })
    .catch((err) => {
      authErrorState.setState(err);
      throw err;
    })
    .finally(() => isAuthorization.setState(false));
});
