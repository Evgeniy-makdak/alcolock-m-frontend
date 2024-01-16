import { userState } from '@features/menu_button/model/store';
import { selectedBranchState } from '@shared/model/selected_branch/store';
import { createEffect } from 'effector';

import AlcolocksApi from '../api/alcolocks_api';
import AlcolocksMapper from './mapper';
import {
  alcolockBranchSwitchLoadingState,
  alkozamkiLoadingState,
  allAlkozamkiState,
  changeAlcolcokLoadingState,
  createAlcolcokLoadingState,
  lastGetAlcolocksListRequestState,
  lastGetItemDataRequest,
  lastSearchAlcolocksRequest,
  loadingItemDataState,
} from './store';

export const AlcolocksSortTypes = {
  byName: 'byName',
  bySerial: 'bySerial',
  byCar: 'byCar',
  byUser: 'byUser',
  byDate: 'byDate',
  byMode: 'byMode',
};

const getSortQuery = (orderType, order) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case AlcolocksSortTypes.byName:
      return `&sort=name${orderStr}`;
    case AlcolocksSortTypes.bySerial:
      return `&sort=serialNumber${orderStr}`;
    case AlcolocksSortTypes.byCar:
      return `&sort=vehicleBind.vehicle.manufacturer,vehicleBind.vehicle.model,vehicleBind.vehicle.registrationNumber${orderStr}`;
    case AlcolocksSortTypes.byUser:
      return '';
    case AlcolocksSortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    case AlcolocksSortTypes.byMode:
      return `&sort=mode${orderStr}`;
    default:
      return '';
  }
};

export const uploadAlkozamkiList = createEffect(
  ({ page, limit, sortBy, order, query, startDate, endDate, groupId }) => {
    alkozamkiLoadingState.setState(true);
    const queryTrimmed = (query ?? '').trim();
    let queries = '';
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };

    lastGetAlcolocksListRequestState.$store.getState()?.abort();

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
      queries += `&any.name.contains=${queryTrimmed}`;
      queries += `&any.serialNumber.contains=${queryTrimmed}`;
      queries += `&any.createdBy.firstName.contains=${queryTrimmed}`;
      queries += `&any.createdBy.lastName.contains=${queryTrimmed}`;
    }

    if (groupId) {
      queries += `&all.assignment.branch.id.in=${groupId}`;
    } else {
      if (selectedBranch) {
        queries += `&all.assignment.branch.id.equals=${selectedBranch.id}`;
      } else {
        queries += `&all.assignment.branch.id.equals=10`;
      }
    }

    const { promise, controller } = AlcolocksApi.getList({
      page: page - 1,
      limit,
      queries,
    });
    lastGetAlcolocksListRequestState.setState(controller);

    return promise
      .then(({ res, headers }) => {
        const total = +headers?.get('X-Total-Count') ?? 0;
        alkozamkiLoadingState.setState(false);
        lastGetAlcolocksListRequestState.setState(null);
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
        alkozamkiLoadingState.setState(false);
        lastGetAlcolocksListRequestState.setState(null);
        console.log(err);
        throw err;
      });
  },
);

export const deleteItem = createEffect((id) => {
  const { promise } = AlcolocksApi.deleteItem(id);

  return promise
    .then(({ res }) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
});

export const addItem = createEffect((data) => {
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };
  createAlcolcokLoadingState.setState(true);
  const { promise } = AlcolocksApi.createItem(
    AlcolocksMapper.getAlcolockToApi({
      ...data,
      branchId: selectedBranch?.id ?? 10,
    }),
  );

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => createAlcolcokLoadingState.setState(false));
});

export const getItem = createEffect((id) => {
  loadingItemDataState.setState(true);
  const lastRequest = lastGetItemDataRequest.$store.getState();
  lastRequest?.abort();

  const { promise, controller } = AlcolocksApi.getItem(id);
  lastGetItemDataRequest.setState(controller);

  return promise
    .then(({ res }) => {
      loadingItemDataState.setState(false);
      lastGetItemDataRequest.setState(null);
      return AlcolocksMapper.getAlcolockFromApi(res);
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      loadingItemDataState.setState(false);
      lastGetItemDataRequest.setState(null);
      throw err;
    });
});

export const changeItem = createEffect((payload) => {
  changeAlcolcokLoadingState.setState(true);
  const { promise } = AlcolocksApi.changeItem(
    payload.id,
    AlcolocksMapper.getAlcolockToApi(payload.data),
  );

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => changeAlcolcokLoadingState.setState(false));
});

export const changeAlcolockService = createEffect(({ id, workMode, serviceStatus }) => {
  const allList = [...allAlkozamkiState.$store.getState()];
  const alcolockIndex = allList.findIndex((item) => item.id === id);

  if (alcolockIndex >= 0) {
    allList[alcolockIndex] = {
      ...allList[alcolockIndex],
      service_status: serviceStatus,
      work_mode: workMode,
    };

    allAlkozamkiState.setState(allList);
  }
});

export const searchAlcolocks = createEffect(({ query, excludeGroupId }) => {
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };
  const trimmedQuery = query?.trim() ?? null;
  let queries = '';
  lastSearchAlcolocksRequest.$store.getState()?.abort();

  if (trimmedQuery) {
    queries += `&any.name.contains=${trimmedQuery}`;
    queries += `&any.serialNumber.contains=${trimmedQuery}`;
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

  const { promise, controller } = AlcolocksApi.getList({
    page: 0,
    limit: 20,
    queries,
  });
  lastSearchAlcolocksRequest.setState(controller);
  return promise
    .then(({ res }) => {
      lastSearchAlcolocksRequest.setState(null);
      if (Array.isArray(res)) {
        return res.map((item) => ({
          value: item,
          label: `${item.name} ${item.serialNumber}`,
        }));
      } else {
        return [];
      }
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      lastSearchAlcolocksRequest.setState(null);
      throw err;
    });
});

export const switchAlcolockGroup = createEffect((payload) => {
  alcolockBranchSwitchLoadingState.setState(true);

  const { promise } = AlcolocksApi.switchBranch(payload.alcolockId, payload.groupId);

  return promise
    .then((res) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => alcolockBranchSwitchLoadingState.setState(false));
});
