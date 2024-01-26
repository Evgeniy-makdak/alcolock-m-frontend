import { createEffect } from 'effector';

import { userState } from '@features/menu_button/model/store';
import { selectedBranchState } from '@shared/model/selected_branch/store';
import { Formatters } from '@shared/utils/formatters';

import EventsApi from '../../events/api/events_api';
import {
  allAutoServiceListState,
  autoServiceListLoadingState,
  lastCheckAutoServiceCountRequest,
  lastGetAutoServiceListRequest,
  notificationsCountState,
  updateTableState,
} from './store';

export const AutoServiceSortTypes = {
  byState: 'byState',
  byProcess: 'byProcess',
  byDriver: 'byDriver',
  byCar: 'byCar',
  bySerial: 'bySerial',
  byDate: 'byDate',
};
const getSortQuery = (orderType, order) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case AutoServiceSortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    case AutoServiceSortTypes.bySerial:
      return `&sort=device.serialNumber${orderStr}`;
    case AutoServiceSortTypes.byCar:
      return `&sort=vehicleRecord.manufacturer${orderStr}`;
    case AutoServiceSortTypes.byDriver:
      return `&sort=createdBy.lastName${orderStr}`;
    default:
      return '';
  }
};

export const checkAutoServiceCount = createEffect(() => {
  if (lastGetAutoServiceListRequest.$store.getState()) return;
  let queries =
    '&all.type.in=SERVICE_MODE_ACTIVATE,SERVICE_MODE_DEACTIVATE&all.seen.in=false&all.events.eventType.notEquals=TIMEOUT&all.status.notIn=INVALID';
  const { promise, controller } = EventsApi.getList({
    page: 0,
    limit: 10000,
    queries,
  });
  lastCheckAutoServiceCountRequest.setState(controller);

  return promise
    .then(({ headers }) => {
      lastCheckAutoServiceCountRequest.setState(null);
      const total = +headers?.get('X-Total-Count') ?? 0;
      notificationsCountState.setState(total);
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      lastCheckAutoServiceCountRequest.setState(null);
      throw err;
    });
});

export const uploadAutoServiceList = createEffect(
  ({ page, limit, sortBy, order, query, startDate, endDate }) => {
    lastCheckAutoServiceCountRequest.$store.getState()?.abort();
    autoServiceListLoadingState.setState(true);
    const queryTrimmed = Formatters.removeExtraSpaces(query ?? '');
    let updateCount = true;
    let queries =
      '&all.type.in=SERVICE_MODE_ACTIVATE,SERVICE_MODE_DEACTIVATE&all.seen.in=false&all.events.eventType.notEquals=TIMEOUT&all.status.notIn=INVALID';
    lastGetAutoServiceListRequest.$store.getState()?.abort();
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };

    if (startDate) {
      updateCount = false;
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      updateCount = false;
      const date = new Date(endDate).toISOString();
      queries += `&all.createdAt.lessThanOrEqual=${date}`;
    }

    if (sortBy && order) {
      queries += getSortQuery(sortBy, order);
    }

    if (queryTrimmed.length) {
      updateCount = false;
      queries += `&any.device.serialNumber.contains=${queryTrimmed}`;
      queries += `&any.createdBy.match.contains=${queryTrimmed}`;
      queries += `&any.vehicleRecord.match.contains=${queryTrimmed}`;
    }

    if (selectedBranch) {
      queries += `&all.device.assignment.branch.id.equals=${selectedBranch.id}`;
    } else {
      queries += `&all.device.assignment.branch.id.equals=10`;
    }

    const { promise, controller } = EventsApi.getList({
      page: page - 1,
      limit,
      queries,
    });
    lastGetAutoServiceListRequest.setState(controller);

    return promise
      .then(({ res, headers }) => {
        const total = +headers?.get('X-Total-Count') ?? 0;
        autoServiceListLoadingState.setState(false);
        lastGetAutoServiceListRequest.setState(null);

        if (updateCount) {
          notificationsCountState.setState(total);
        }

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
        autoServiceListLoadingState.setState(false);
        lastGetAutoServiceListRequest.setState(null);
        throw err;
      });
  },
);

export const hideExpiredItems = createEffect((id) => {
  const allList = allAutoServiceListState.$store.getState();

  allAutoServiceListState.setState(allList.filter((item) => item.id !== id));
  updateTableState.setState(!updateTableState.$store.getState());
});

export const getAutoService = createEffect((id) => {
  return allAutoServiceListState.$store.getState().find((elem) => elem.id === id);
});
