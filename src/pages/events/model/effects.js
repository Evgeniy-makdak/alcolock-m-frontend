import { createEffect } from 'effector';

import { userState } from '@features/menu_button/model/store';
import { selectedBranchState } from '@shared/model/selected_branch/store';
import { Formatters } from '@shared/utils/formatters';

import EventsApi from '../api/events_api';
import {
  activateServiceLoadingState,
  eventsLoadingState,
  lastGetEventDataRequest,
  lastGetEventsHistoryRequest,
  lastGetEventsListRequest,
} from './store';

export const EventsSortTypes = {
  byUserName: 'byUserName',
  byCarMake: 'byCarMake',
  byDate: 'byDate',
  byCarLicense: 'byCarLicense',
  byEventType: 'byEventType',
};

const getSortQuery = (orderType, order) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case EventsSortTypes.byUserName:
      return `&sort=createdBy.lastName${orderStr}`;
    case EventsSortTypes.byCarMake:
      return `&sort=vehicleRecord.manufacturer${orderStr}`;
    case EventsSortTypes.byCarLicense:
      return `&sort=vehicleRecord.registrationNumber${orderStr}`;
    case EventsSortTypes.byEventType:
      return `&sort=type${orderStr}`;
    case EventsSortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    default:
      return '';
  }
};

export const uploadEvents = createEffect(
  ({ page, limit, sortBy, order, query, startDate, endDate, filtersData }) => {
    eventsLoadingState.setState(true);

    const queryTrimmed = Formatters.removeExtraSpaces(query ?? '');
    let queries = '';
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };

    lastGetEventsListRequest.$store.getState()?.abort();

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
      queries += `&any.createdBy.match.contains=${queryTrimmed}`;
      queries += `&any.vehicleRecord.match.contains=${queryTrimmed}`;
    }

    if (selectedBranch) {
      queries += `&all.device.assignment.branch.id.equals=${selectedBranch.id}`;
    } else {
      queries += `&all.device.assignment.branch.id.equals=10`;
    }

    if (filtersData) {
      if ((filtersData?.users ?? []).length) {
        const usersId = filtersData.users.map((option) => option.value.id).join(',');
        queries += `&any.events.user.id.in=${usersId}`;
      }

      if ((filtersData?.carsByMake ?? []).length) {
        const items = filtersData.carsByMake.map((option) => option.label).join(',');
        queries += `&any.vehicleRecord.manufacturer.in=${items}`;
      }

      if ((filtersData?.carsByLicense ?? []).length) {
        const items = filtersData.carsByLicense.map((option) => option.label).join(',');
        queries += `&any.vehicleRecord.registrationNumber.in=${items}`;
      }

      if ((filtersData?.eventsByType ?? []).length) {
        const items = filtersData.eventsByType.map((option) => option.value).join(',');
        queries += `&any.type.in=${items}`;
      }
    }

    const { promise, controller } = EventsApi.getList({
      page: page - 1,
      limit,
      queries,
    });
    lastGetEventsListRequest.setState(controller);

    return promise
      .then(({ res, headers }) => {
        const total = +headers?.get('X-Total-Count') ?? 0;
        eventsLoadingState.setState(false);
        lastGetEventsListRequest.setState(null);

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
        eventsLoadingState.setState(false);
        lastGetEventsListRequest.setState(null);
        throw err;
      });
  },
);

export const getEvent = createEffect((id) => {
  lastGetEventDataRequest.$store.getState()?.abort();

  const { promise, controller } = EventsApi.getItem(id);
  lastGetEventDataRequest.setState(controller);
  return promise
    .then(({ res }) => {
      lastGetEventDataRequest.setState(null);
      return res;
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      lastGetEventDataRequest.setState(null);
      throw err;
    });
});

export const getEventsHistory = createEffect(({ userId, carId, alcolockId }) => {
  lastGetEventsHistoryRequest.$store.getState()?.abort();

  let queries = '';
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };

  if (userId) {
    queries += `&all.events.user.id.equals=${userId}`;
  }

  if (carId) {
    queries += `&all.vehicle.id.in=${carId}`;
  }

  if (alcolockId) {
    queries += `&all.device.id.in=${alcolockId}`;
  }

  if (selectedBranch) {
    queries += `&all.device.assignment.branch.id.equals=${selectedBranch.id}`;
  } else {
    queries += `&all.device.assignment.branch.id.equals=10`;
  }

  const { promise, controller } = EventsApi.getList({
    page: 0,
    limit: 1000,
    queries,
  });
  lastGetEventsHistoryRequest.setState(controller);
  return promise
    .then(({ res }) => {
      lastGetEventsHistoryRequest.setState(null);
      if (Array.isArray(res)) {
        return res;
      } else {
        return [];
      }
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      lastGetEventsHistoryRequest.setState(null);
      throw err;
    });
});

export const activateServiceMode = createEffect(({ data, deviceId, isDeactivate = false }) => {
  activateServiceLoadingState.setState(true);
  const requestData = isDeactivate
    ? {
        deviceId,
        type: 'SERVICE_MODE_DEACTIVATE',
      }
    : {
        duration: data.duration * 3600,
        deviceId,
        type: 'SERVICE_MODE_ACTIVATE',
      };

  const { promise } = EventsApi.activateServiceMode(deviceId, requestData);

  return promise
    .then(({ res }) => {
      return res;
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => activateServiceLoadingState.setState(false));
});

export const cancelActivateService = createEffect((id) => {
  const { promise } = EventsApi.cancelActivateServiceMode(id);

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    });
});

export const rejectActivateService = createEffect((id) => {
  const { promise } = EventsApi.rejectActivateServiceMode(id);

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    });
});

export const acceptActivateService = createEffect((id) => {
  const { promise } = EventsApi.acceptActivateServiceMode(id);

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    });
});

export const seenAutoService = createEffect((id) => {
  const { promise } = EventsApi.seenAction(id);

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    });
});
