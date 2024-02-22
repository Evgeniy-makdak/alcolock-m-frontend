import { createEffect } from 'effector/effector.mjs';

import { DateUtils } from '@shared/utils/DateUtils';
import { Formatters } from '@shared/utils/formatters';

import GroupsApi from '../api/groups_api';
import {
  alcolocksMoveLoadingState,
  carsMoveLoadingState,
  changeGroupLoadingState,
  createGroupLoadingState,
  groupLoadingState,
  groupsListLoadingState,
  lastGetGroupRequest,
  lastGetGroupsListRequestState,
  lastSearchGroupsRequest,
  usersMoveLoadingState,
} from './store';

export const GroupsSortTypes = {
  byName: 'byName',
  byUser: 'byUser',
  byDate: 'byDate',
};
const getSortQuery = (orderType, order) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case GroupsSortTypes.byName:
      return `&sort=name${orderStr}`;
    case GroupsSortTypes.byUser:
      return `&sort=createdBy.lastName${orderStr}`;
    case GroupsSortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    default:
      return '';
  }
};

export const uploadGroupsList = createEffect(
  ({ page, limit, sortBy, order, query, startDate, endDate, excludeGroupId }) => {
    if (!excludeGroupId) {
      groupsListLoadingState.setState(true);
    }

    const queryTrimmed = Formatters.removeExtraSpaces(query ?? '');
    let queries = '';
    lastGetGroupsListRequestState.$store.getState()?.abort();

    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      queries += `&all.createdAt.lessThan=${DateUtils.getEndFilterDate(endDate)}`;
    }

    if (sortBy && order) {
      queries += getSortQuery(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.name.contains=${queryTrimmed}`;
    }

    if (excludeGroupId) {
      queries += `&all.id.notIn=${excludeGroupId}, 10`;
    }

    const { promise, controller } = GroupsApi.getList({
      page: page - 1,
      limit,
      queries,
    });
    lastGetGroupsListRequestState.setState(controller);

    return promise
      .then(({ res, headers }) => {
        const total = +headers?.get('X-Total-Count') ?? 0;
        groupsListLoadingState.setState(false);
        lastGetGroupsListRequestState.setState(null);

        if (Array.isArray(res)) {
          return {
            list: res,
            count: isNaN(total) ? 0 : total,
          };
        } else {
          return {
            list: [],
            count: 0,
          };
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        groupsListLoadingState.setState(false);
        lastGetGroupsListRequestState.setState(null);
        console.log(err);
        throw err;
      });
  },
);

export const deleteGroup = createEffect((id) => {
  const { promise } = GroupsApi.deleteItem(id);

  return promise
    .then(({ res }) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
});

export const addGroup = createEffect((data) => {
  createGroupLoadingState.setState(true);
  const { promise } = GroupsApi.createItem(data);

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => createGroupLoadingState.setState(false));
});

export const editGroupName = createEffect(({ id, data }) => {
  changeGroupLoadingState.setState(true);
  const { promise } = GroupsApi.changeItem(id, data);

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => changeGroupLoadingState.setState(false));
});

export const getGroup = createEffect((id) => {
  groupLoadingState.setState(true);
  lastGetGroupRequest.$store.getState()?.abort();

  const { promise, controller } = GroupsApi.getItem(id);
  lastGetGroupRequest.setState(controller);

  return promise
    .then(({ res }) => {
      groupLoadingState.setState(false);
      lastGetGroupRequest.setState(null);
      return res;
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;

      groupLoadingState.setState(false);
      lastGetGroupRequest.setState(null);
      throw err;
    });
});

export const GroupUsersSortTypes = {
  byName: 'byName',
  byEmail: 'byEmail',
};

export const addGroupUser = createEffect((payload) => {
  usersMoveLoadingState.setState(true);
  const { groupId, data } = payload;
  const addedUsersId = data.user?.map((option) => option.value.id) ?? [];

  const { promise } = GroupsApi.moveItems(groupId, addedUsersId);

  return promise
    .then(({ res }) => {
      return res;
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => usersMoveLoadingState.setState(false));
});
export const GroupAlcolocksSortTypes = {
  byName: 'byName',
  bySerial: 'bySerial',
  byCar: 'byCar',
};

export const addGroupAlcolock = createEffect((payload) => {
  alcolocksMoveLoadingState.setState(true);
  const { groupId, data } = payload;
  const addedAlcoloclsIds = data.alcolock?.map((option) => option.value.id) ?? [];

  const { promise } = GroupsApi.moveItems(groupId, addedAlcoloclsIds);

  return promise
    .then(({ res }) => {
      return res;
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => alcolocksMoveLoadingState.setState(false));
});

export const GroupCarsSortTypes = {
  byMake: 'byMake',
  byModel: 'byModel',
  byVin: 'byVin',
  byLicense: 'byLicense',
};

export const addGroupCar = createEffect((payload) => {
  carsMoveLoadingState.setState(true);
  const { groupId, data } = payload;
  const newCarsIds = data.car?.map((option) => option.value.id) ?? [];

  const { promise } = GroupsApi.moveItems(groupId, newCarsIds);

  return promise
    .then(({ res }) => {
      return res;
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => carsMoveLoadingState.setState(false));
});

export const searchGroups = createEffect((query) => {
  lastSearchGroupsRequest.$store.getState()?.abort();
  let queries = '';

  if (Formatters.removeExtraSpaces(query ?? '').length) {
    queries += `&all.name.contains=${query}`;
  }

  const { promise, controller } = GroupsApi.getList({
    page: 0,
    limit: 20,
    queries,
  });
  lastSearchGroupsRequest.setState(controller);

  return promise
    .then(({ res }) => {
      lastSearchGroupsRequest.setState(null);
      if (Array.isArray(res)) {
        return res;
      } else {
        return [];
      }
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      lastSearchGroupsRequest.setState(null);
      throw err;
    });
});
