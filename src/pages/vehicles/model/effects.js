import { createEffect } from 'effector';

import { userState } from '@features/menu_button/model/store';
import { selectedBranchState } from '@shared/model/selected_branch/store';
import { DateUtils } from '@shared/utils/DateUtils';
import { Formatters } from '@shared/utils/formatters';

import VehiclesApi from '../api/vehicles_api';
import {
  carBranchSwitchLoadingState,
  carDataLoadingState,
  carsLoadingState,
  changingCarLoadingState,
  createCarLoadingState,
  lastGetCarDataRequest,
  lastGetVehiclesListRequestState,
  lastSearchByManufacturersRequest,
  lastSearchByRegistrationNumberRequest,
  lastSearchRequest,
} from './store';

export const CarsSortTypes = {
  byMake: 'byMake',
  byModel: 'byModel',
  byVin: 'byVin',
  byLicense: 'byLicense',
  byManufacture: 'byManufacture',
  byDate: 'byDate',
};

const getSortQuery = (orderType, order) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case CarsSortTypes.byMake:
      return `&sort=manufacturer${orderStr}`;
    case CarsSortTypes.byModel:
      return `&sort=model${orderStr}`;
    case CarsSortTypes.byVin:
      return `&sort=vin${orderStr}`;
    case CarsSortTypes.byLicense:
      return `&sort=registrationNumber${orderStr}`;
    case CarsSortTypes.byManufacture:
      return `&sort=year${orderStr}`;
    case CarsSortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    default:
      return '';
  }
};

export const uploadCarsList = createEffect(
  ({ page, limit, sortBy, order, query, startDate, endDate, groupId }) => {
    carsLoadingState.setState(true);
    const queryTrimmed = Formatters.removeExtraSpaces(query ?? '');
    let queries = '';
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };

    lastGetVehiclesListRequestState.$store.getState()?.abort();

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
      queries += `&any.match.contains=${queryTrimmed}`;
      queries += `&any.vin.contains=${queryTrimmed}`;
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

    const { promise, controller } = VehiclesApi.getList({
      page: page - 1,
      limit,
      queries,
    });
    lastGetVehiclesListRequestState.setState(controller);

    return promise
      .then(({ res, headers }) => {
        const total = +headers?.get('X-Total-Count') ?? 0;
        carsLoadingState.setState(false);
        lastGetVehiclesListRequestState.setState(null);
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
        lastGetVehiclesListRequestState.setState(null);
        carsLoadingState.setState(false);
        console.log(err);
        throw err;
      });
  },
);

export const clearVehiclesRequests = createEffect(() => {
  lastGetVehiclesListRequestState.$store.getState()?.abort();
  lastGetCarDataRequest.$store.getState()?.abort();
});

export const deleteCar = createEffect((id) => {
  const { promise } = VehiclesApi.deleteItem(id);

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    });
});

export const addCar = createEffect(async (data) => {
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };
  createCarLoadingState.setState(true);
  const { promise } = VehiclesApi.createItem({
    ...data,
    branchId: selectedBranch?.id ?? 10,
  });

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      console.log(err.response);
      throw err;
    })
    .finally(() => createCarLoadingState.setState(false));
});

export const getCar = createEffect((id) => {
  carDataLoadingState.setState(true);
  const lastRequest = lastGetCarDataRequest.$store.getState();
  lastRequest?.abort();

  const { promise, controller } = VehiclesApi.getItem(id);
  lastGetCarDataRequest.setState(controller);

  return promise
    .then(({ res }) => {
      lastGetCarDataRequest.setState(null);
      carDataLoadingState.setState(false);
      return res;
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      carDataLoadingState.setState(false);
      lastGetCarDataRequest.setState(null);
      throw err;
    });
});

export const changeCar = createEffect((payload) => {
  changingCarLoadingState.setState(true);
  const { promise } = VehiclesApi.changeItem(payload.id, payload.data);
  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => changingCarLoadingState.setState(false));
});

export const searchCarsByRegistrationNumber = createEffect((query = null) => {
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };
  const trimmedQuery = Formatters.removeExtraSpaces(query ?? '');
  let queries = '&sort=manufacturer,ASC';
  lastSearchByRegistrationNumberRequest.$store.getState()?.abort();

  if (trimmedQuery) {
    queries += `&registrationNumber.contains=${trimmedQuery}`;
  }

  if (selectedBranch) {
    queries += `&all.assignment.branch.id.equals=${selectedBranch.id}`;
  } else {
    queries += `&all.assignment.branch.id.equals=10`;
  }

  const { promise, controller } = VehiclesApi.getList({
    page: 0,
    limit: 20,
    queries,
  });
  lastSearchByRegistrationNumberRequest.setState(controller);
  return promise
    .then(({ res }) => {
      lastSearchByRegistrationNumberRequest.setState(null);
      if (Array.isArray(res)) {
        return res.map((item) => ({
          value: item,
          label: item.registrationNumber,
        }));
      } else {
        return [];
      }
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      lastSearchByRegistrationNumberRequest.setState(null);
      throw err;
    });
});

export const searchCarsManufacturers = createEffect((query = null) => {
  const trimmedQuery = Formatters.removeExtraSpaces(query ?? '');
  let queries = '&sort=match,ASC';
  lastSearchByManufacturersRequest.$store.getState()?.abort();

  if (trimmedQuery) {
    queries += `&match=${trimmedQuery}`;
  }

  const { promise, controller } = VehiclesApi.getManufacturersList({
    page: 0,
    limit: 20,
    queries,
  });
  lastSearchByManufacturersRequest.setState(controller);
  return promise
    .then(({ res }) => {
      lastSearchByManufacturersRequest.setState(null);
      if (Array.isArray(res)) {
        return res.map((item) => ({
          value: item,
          label: item,
        }));
      } else {
        return [];
      }
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      lastSearchByManufacturersRequest.setState(null);
      throw err;
    });
});

export const searchCars = createEffect(
  ({ query, withoutAlcolock, withoutDriver, excludeGroupId }) => {
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };
    const trimmedQuery = Formatters.removeExtraSpaces(query ?? '');
    let queries = '&sort=manufacturer,ASC';
    const lastRequest = lastSearchRequest.$store.getState();
    lastRequest?.abort();

    if (trimmedQuery) {
      queries += `&any.match.contains=${trimmedQuery}`;
    }

    if (withoutAlcolock) {
      queries += '&all.monitoringDevice.id.specified=false';
    }

    if (withoutDriver) {
      queries += '&all.driverAllotments.id.specified=false';
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

    const { promise, controller } = VehiclesApi.getList({
      page: 0,
      limit: 20,
      queries,
    });
    lastSearchRequest.setState(controller);
    return promise
      .then(({ res }) => {
        lastSearchRequest.setState(null);
        if (Array.isArray(res)) {
          return res.map((item) => {
            return {
              value: item,
              label: `${item.manufacturer} ${item.model} ${item.registrationNumber}`,
            };
          });
        } else {
          return [];
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        lastSearchRequest.setState(null);
        console.log(err);
        throw err;
      });
  },
);

export const switchCarGroup = createEffect((paylaod) => {
  carBranchSwitchLoadingState.setState(true);

  const { promise } = VehiclesApi.switchBranch(paylaod.id, paylaod.groupId);

  return promise
    .then((res) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => carBranchSwitchLoadingState.setState(false));
});
