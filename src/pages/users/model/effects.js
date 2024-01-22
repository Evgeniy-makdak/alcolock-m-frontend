import { createEffect } from 'effector';

import { userState } from '@features/menu_button/model/store';
import { selectedBranchState } from '@shared/model/selected_branch/store';
import { Formatters } from '@shared/utils/formatters';

import UsersApi from '../api/users_api';
import UsersMapper from './mapper';
import {
  changeUserLoadingState,
  createUserLoadingState,
  lastGetUserDataRequest,
  lastSearchDriversRequest,
  lastSearchUsersRequest,
  lastUsersListRequest,
  userBranchSwitchLoadingState,
  userDataLoadingState,
  userErrorState,
  usersLoadingState,
} from './store';

export const UsersSortTypes = {
  byName: 'byName',
  byEmail: 'byEmail',
  byRole: 'byRole',
  byAccess: 'byAccess',
  byDate: 'byDate',
};

const getSortQuery = (orderType, order) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case UsersSortTypes.byName:
      return `&sort=lastName${orderStr}`;
    case UsersSortTypes.byEmail:
      return `&sort=email${orderStr}`;
    case UsersSortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    default:
      return '';
  }
};

export const uploadUsersList = createEffect(
  ({ page, limit, sortBy, order, query, startDate, endDate, groupId }) => {
    const queryTrimmed = (query ?? '').trim();
    let queries = '';
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };

    usersLoadingState.setState(true);
    lastUsersListRequest.$store.getState()?.abort();

    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      const date = new Date(endDate).toISOString();
      queries += `&all.createdAt.lessThanOrEqual=${date}`;
    }

    if (sortBy && order) {
      queries += getSortQuery(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.firstName.contains=${queryTrimmed}`;
      queries += `&any.middleName.contains=${queryTrimmed}`;
      queries += `&any.lastName.contains=${queryTrimmed}`;
      queries += `&any.email.contains=${queryTrimmed}`;
    }

    if (groupId) {
      queries += `&all.assignment.branch.id.in=${groupId}`;
      queries += `&all.driver.vehicleAllotments.include=true`;
    } else {
      if (selectedBranch) {
        queries += `&all.assignment.branch.id.equals=${selectedBranch.id}`;
      } else {
        queries += `&all.assignment.branch.id.equals=10`;
      }
    }

    const { promise, controller } = UsersApi.getList({
      page: page - 1,
      limit,
      queries,
    });
    lastUsersListRequest.setState(controller);

    return promise
      .then(({ res, headers }) => {
        const total = +headers?.get('X-Total-Count') ?? 0;
        lastUsersListRequest.setState(null);
        usersLoadingState.setState(false);

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
        lastUsersListRequest.setState(null);
        usersLoadingState.setState(false);
        throw err;
      });
  },
);

export const deleteUser = createEffect((id) => {
  const { promise } = UsersApi.deleteItem(id);

  return promise
    .then(({ res }) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
});

export const addUser = createEffect((data) => {
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };
  createUserLoadingState.setState(true);

  const { promise } = UsersApi.createItem(
    UsersMapper.getUserToApi({ ...data, branchId: selectedBranch?.id ?? 10 }),
  );

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      userErrorState.setState(err);
      throw err;
    })
    .finally(() => createUserLoadingState.setState(false));
});

export const getUser = createEffect((id) => {
  userDataLoadingState.setState(true);
  lastGetUserDataRequest.$store.getState()?.abort();

  const { promise, controller } = UsersApi.getItem(id);
  lastGetUserDataRequest.setState(controller);

  return promise
    .then(({ res }) => {
      userDataLoadingState.setState(false);
      lastGetUserDataRequest.setState(null);

      return res;
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      userDataLoadingState.setState(false);
      lastGetUserDataRequest.setState(null);
      throw err;
    });
});

export const changeUser = createEffect((payload) => {
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };
  changeUserLoadingState.setState(true);

  const { promise } = UsersApi.changeItem(
    payload.id,
    UsersMapper.getUserToApi(
      {
        ...payload.data,
        branchId: selectedBranch?.id ?? 10,
      },
      true,
    ),
  );

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      userErrorState.setState(err);
      throw err;
    })
    .finally(() => changeUserLoadingState.setState(false));
});

export const searchUsers = createEffect(({ query, excludeGroupId }) => {
  const trimmedQuery = query?.trim() ?? null;
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };
  let queries = '';
  lastSearchUsersRequest.$store.getState()?.abort();

  if (trimmedQuery) {
    queries += `&any.lastName.contains=${trimmedQuery}`;
    queries += `&any.firstName.contains=${trimmedQuery}`;
    queries += `&any.middleName.contains=${trimmedQuery}`;
    queries += `&any.email.contains=${trimmedQuery}`;
  }

  if (excludeGroupId) {
    queries += `&all.assignment.branch.id.notEquals=${excludeGroupId}`;
  } else {
    if (selectedBranch) {
      queries += `&all.assignment.branch.id.equals=${selectedBranch.id}`;
    } else {
      queries += `&all.assignment.branch.id.equals=10`;
    }
  }

  const { promise, controller } = UsersApi.getList({
    page: 0,
    limit: 20,
    queries,
  });
  lastSearchUsersRequest.setState(controller);

  return promise
    .then(({ res }) => {
      lastSearchUsersRequest.setState(null);
      if (Array.isArray(res)) {
        return res.map((item) => {
          return {
            value: item,
            label: Formatters.nameFormatter(item) + ` (${item?.assignment?.branch?.name ?? '-'})`,
          };
        });
      } else {
        return [];
      }
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      lastSearchUsersRequest.setState(null);
      throw err;
    });
});

export const searchDrivers = createEffect((query) => {
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };
  const trimmedQuery = query?.trim() ?? null;
  let queries = '&sort=lastName,ASC';
  const lastRequest = lastSearchDriversRequest.$store.getState();
  lastRequest?.abort();

  queries += `&all.driver.id.specified=true`;

  if (trimmedQuery) {
    queries += `&any.lastName.contains=${trimmedQuery}`;
    queries += `&any.firstName.contains=${trimmedQuery}`;
    queries += `&any.middleName.contains=${trimmedQuery}`;
    queries += `&any.email.contains=${trimmedQuery}`;
  }

  if (selectedBranch) {
    queries += `&all.assignment.branch.id.equals=${selectedBranch.id}`;
  } else {
    queries += `&all.assignment.branch.id.equals=10`;
  }

  const { promise, controller } = UsersApi.getList({
    page: 0,
    limit: 20,
    queries,
  });
  lastSearchDriversRequest.setState(controller);
  return promise
    .then(({ res }) => {
      lastSearchDriversRequest.setState(null);
      if (Array.isArray(res)) {
        return res.map((item) => {
          return {
            value: item,
            label: Formatters.nameFormatter(item) + ` (${item.email})`,
          };
        });
      } else {
        return [];
      }
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      lastSearchDriversRequest.setState(null);
      throw err;
    });
});

export const switchUserGroup = createEffect((paylaod) => {
  userBranchSwitchLoadingState.setState(true);

  const { promise } = UsersApi.switchBranch(paylaod.userId, paylaod.groupId);

  return promise
    .then((res) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => userBranchSwitchLoadingState.setState(false));
});
