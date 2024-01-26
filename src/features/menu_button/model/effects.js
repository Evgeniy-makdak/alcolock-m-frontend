import { createEffect } from 'effector';

import { RoutePaths } from '@app';
import { AuthStatus, appAuthStatusState, appLoadingState } from '@app/model/store';
import { cookieManager } from '@shared/utils/cookie_manager';

import UserApi from '../api/user_api';
import { Entitys, UserPermissionsTypes } from '../lib/const';
import { changePasswordErrorState, changePasswordLoadingState, userState } from './store';

const permissionsNormalize = (permissionsList, entity) => {
  if (permissionsList.includes(`PERMISSION_${entity}_CREATE`)) {
    return UserPermissionsTypes.CREATE;
  } else if (permissionsList.includes(`PERMISSION_${entity}_READ`)) {
    return UserPermissionsTypes.READ;
  } else {
    return null;
  }
};

const permissionsMapper = (permissionsList) => {
  const permissions = {
    users: permissionsNormalize(permissionsList, Entitys.USER),
    cars: permissionsNormalize(permissionsList, Entitys.VEHICLE),
    attachments: null,
    alcolocks: permissionsNormalize(permissionsList, Entitys.DEVICE),
  };

  if (
    permissions.users === UserPermissionsTypes.CREATE &&
    permissions.cars === UserPermissionsTypes.CREATE
  ) {
    permissions.attachments = UserPermissionsTypes.CREATE;
  } else if (!!permissions.users && !!permissions.cars) {
    permissions.attachments = UserPermissionsTypes.read;
  }

  return permissions;
};

export const getUserData = createEffect(({ token }) => {
  appLoadingState.setState(true);
  const { promise } = UserApi.getInfo(token);
  promise
    .then(({ res }) => {
      if ('id' in res) {
        userState.setState({
          ...res,
          isAdmin: res.permissions?.includes('SYSTEM_GLOBAL_ADMIN') ?? false,
          permissions: permissionsMapper(res.permissions ?? []),
        });
        appAuthStatusState.setState(AuthStatus.auth);
      }
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => appLoadingState.setState(false));
});

export const changeUserData = createEffect((data) => {
  const userData = userState.$store.getState();
  userState.setState({
    ...userData,
    email: data.email,
  });
});

export const changePassword = createEffect((data) => {
  changePasswordLoadingState.setState(true);

  const { promise } = UserApi.changePassword(data);

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      changePasswordErrorState.setState(err);
      throw err;
    })
    .finally(() => changePasswordLoadingState.setState(false));
});

export const logout = createEffect((navigate) => {
  appAuthStatusState.setState(AuthStatus.notAuth);
  cookieManager.removeAll();
  navigate(RoutePaths.auth);
});
