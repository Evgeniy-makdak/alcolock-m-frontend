import { createEffect } from 'effector';

import { RoutePaths } from '@app';
import { AuthStatus, appAuthStatusState, appLoadingState } from '@app/model/store';
import { cookieManager } from '@shared/utils/cookie_manager';

import UserApi from '../api/user_api';
import { changePasswordErrorState, changePasswordLoadingState, userState } from './store';

export const UserPermissionsTypes = {
  create: 'CREATE',
  read: 'READ',
};

const permissionsNormalize = (permissionsList, entity) => {
  if (permissionsList.includes(`PERMISSION_${entity}_CREATE`)) {
    return UserPermissionsTypes.create;
  } else if (permissionsList.includes(`PERMISSION_${entity}_READ`)) {
    return UserPermissionsTypes.read;
  } else {
    return null;
  }
};

const permissionsMapper = (permissionsList) => {
  const permissions = {
    users: permissionsNormalize(permissionsList, 'USER'),
    cars: permissionsNormalize(permissionsList, 'VEHICLE'),
    attachments: null,
    alcolocks: permissionsNormalize(permissionsList, 'DEVICE'),
  };

  if (
    permissions.users === UserPermissionsTypes.create &&
    permissions.cars === UserPermissionsTypes.create
  ) {
    permissions.attachments = UserPermissionsTypes.create;
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
