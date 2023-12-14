import {createEffect} from "effector";
import {changePasswordErrorState, changePasswordLoadingState, userState} from "./store";
import {cookieManager} from "../../utils/cookie_manager";
import RoutePaths from "../../route_paths";
import {appAuthStatusState, appLoadingState, AuthStatus} from "../app/store";
import UserApi from "../../../data/api/user/user_api";

export const UserPermissionsTypes = {
  create: 'CREATE',
  read: 'READ'
}

const permissionsNormalize = (permissionsList, entity) => {
  if (permissionsList.includes(`PERMISSION_${entity}_CREATE`)) {
    return UserPermissionsTypes.create
  } else if (permissionsList.includes(`PERMISSION_${entity}_READ`)) {
    return UserPermissionsTypes.read
  } else {
    return null
  }
}

const permissionsMapper = (permissionsList) => {
  const permissions = {
    users: permissionsNormalize(permissionsList, 'USER'),
    cars: permissionsNormalize(permissionsList, 'VEHICLE'),
    attachments: null,
    alcolocks: permissionsNormalize(permissionsList, 'DEVICE')
  }

  if (permissions.users === UserPermissionsTypes.create && permissions.cars === UserPermissionsTypes.create) {
    permissions.attachments = UserPermissionsTypes.create
  } else if (!!permissions.users && !!permissions.cars) {
    permissions.attachments = UserPermissionsTypes.read
  }

  return permissions
}

export const getUserData = createEffect(({token, navigate}) => {
  appLoadingState.setState(true)
  const {promise} = UserApi.getInfo(token)
  promise
    .then(({res}) => {
      if ('id' in res) {
        userState.setState({
          ...res,
          isAdmin: res.permissions?.includes('SYSTEM_GLOBAL_ADMIN') ?? false,
          permissions: permissionsMapper(res.permissions ?? [])
        })
        appAuthStatusState.setState(AuthStatus.auth)
      }
    })
    .catch(err => {
      throw err
    })
    .finally(() =>  appLoadingState.setState(false))
})

export const changeUserData = createEffect((data) => {
  const userData = userState.$store.getState()
  userState.setState({
    ...userData,
    email: data.email
  })
})

export const changePassword = createEffect((data) => {
  changePasswordLoadingState.setState(true)

  const {promise} = UserApi.changePassword(data)

  return promise
    .then(({res}) => res)
    .catch(err => {
      changePasswordErrorState.setState(err)
      throw err
    })
    .finally(() => changePasswordLoadingState.setState(false))
})

export const logout = createEffect((navigate) => {
  appAuthStatusState.setState(AuthStatus.notAuth)
  cookieManager.removeAll()
  navigate(RoutePaths.auth)
})
