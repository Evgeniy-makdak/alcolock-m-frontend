import {createEffect} from "effector";
import SearchMethods from "../../utils/global_methods";
import AppConstants from "../../app_constants";
import {
  allRolesState, changeRoleLoadingState,
  createRoleLoadingState, lastGetRoleDataRequest,
  lastGetRolesListRequest,
  roleDataLoadingState,
  rolesListLoadingState
} from "./store";
import Sorts from "../../utils/sortes";
import RolesApi from "../../../data/api/roles/roles_api";
import RolesMapper from "./mapper";

export const RolesSortTypes = {
  byRole: 'byRole',
  byUser: 'byUser',
  byCar: 'byCar',
  byAlkozamok: 'byAlkozamok',
  byAttachment: 'byAttachment',
  byGroups: 'byGroups'
}

const getSortQuery = (orderType, order) => {
  const orderStr = ',' + order.toUpperCase()

  switch (orderType) {
    case RolesSortTypes.byRole:
      return `&sort=name${orderStr}`
    default:
      return ''
  }
}

export const uploadRolesList = createEffect((
  {
    page,
    limit,
    sortBy,
    order,
    query
  }) => {
  rolesListLoadingState.setState(true)
  const queryTrimmed = (query ?? '').trim()
  let queries = ''
  lastGetRolesListRequest.$store.getState()?.abort()

  if (sortBy && order) {
    queries += getSortQuery(sortBy, order)
  }

  if (queryTrimmed.length) {
    queries += `&any.name.contains=${queryTrimmed}`
  }

  const {promise, controller} = RolesApi.getList({
    page: page - 1,
    limit,
    queries
  })
  lastGetRolesListRequest.setState(controller)

  return promise
    .then(({res, headers}) => {
      const total = +headers?.get('X-Total-Count') ?? 0
      rolesListLoadingState.setState(false)
      lastGetRolesListRequest.setState(null)

      if (Array.isArray(res)) {
        return {
          list: res,
          count: isNaN(total) ? 0 : total
        }
      } else {
        return {
          list: [],
          count: 0
        }
      }
    })
    .catch(err => {
      if (err.name === 'AbortError') return
      rolesListLoadingState.setState(false)
      lastGetRolesListRequest.setState(null)
      throw err
    })
})

export const deleteRole = createEffect((id) => {
  const {promise} = RolesApi.deleteItem(id)

  return promise
    .then(({res}) => res)
    .catch(err => {
      throw err
    })
})

export const addRole = createEffect((data) => {
  createRoleLoadingState.setState(true)
  const {promise} = RolesApi.createItem(RolesMapper.toApi(data))

  return promise
    .then(({res}) => res)
    .catch(err => {
      throw err
    })
    .finally(() => createRoleLoadingState.setState(false))
})

export const getRole = createEffect((id) => {
  roleDataLoadingState.setState(true)
  lastGetRoleDataRequest.$store.getState()?.abort()

  const {promise, controller} = RolesApi.getItem(id)
  lastGetRoleDataRequest.setState(controller)
  return promise
    .then(({res}) => {
      roleDataLoadingState.setState(false)
      lastGetRoleDataRequest.setState(null)
      return RolesMapper.fromApi(res)
    })
    .catch(err => {
      if (err.name === 'AbortError') return
      roleDataLoadingState.setState(false)
      lastGetRoleDataRequest.setState(null)
      throw err
    })
})

export const changeRole = createEffect((payload) => {
  changeRoleLoadingState.setState(true)
  const {promise} = RolesApi.changeItem(
    payload.id,
    RolesMapper.toApi(payload.data)
  )

  return promise
    .then(({res}) => res)
    .catch(err => {
      throw err
    })
    .finally(() => changeRoleLoadingState.setState(false))
})
