import { createEffect } from 'effector';

import { userState } from '@features/menu_button/model/store';
import { selectedBranchState } from '@shared/model/selected_branch/store';

import AttachmentsApi from '../api/attachments_api';
import AttachmentsMapper from './mapper';
import {
  attachmentsLoadingState,
  changingAttachmentLoadingState,
  creatingAttachmentLoadingState,
  lastGetAttachmentDataRequest,
  lastGetAttachmentsListRequest,
  loadingAttachmentDataState,
} from './store';

export const AttachmentsSortTypes = {
  byName: 'byName',
  byCar: 'byCar',
  byDriver: 'byDriver',
  byUser: 'byUser',
  bySerial: 'bySerial',
  byDate: 'byDate',
};

const getSortQuery = (orderType, order) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case AttachmentsSortTypes.byName:
      return '';
    case AttachmentsSortTypes.bySerial:
      return `&sort=vehicle.monitoringDevice.serialNumber${orderStr}`;
    case AttachmentsSortTypes.byCar:
      return `&sort=vehicle.manufacturer,vehicle.model,vehicle.registrationNumber${orderStr}`;
    case AttachmentsSortTypes.byDriver:
      return `&sort=driver.userAccount.firstName,driver.userAccount.lastName${orderStr}`;
    case AttachmentsSortTypes.byUser:
      return `&sort=createdBy.firstName,createdBy.lastName${orderStr}`;
    case AttachmentsSortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    default:
      return '';
  }
};

export const uploadAttachments = createEffect(
  ({ page, limit, sortBy, order, query, startDate, endDate }) => {
    attachmentsLoadingState.setState(true);
    const queryTrimmed = (query ?? '').trim();
    let queries = '';
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };

    lastGetAttachmentsListRequest.$store.getState()?.abort();

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
      queries += `&any.vehicle.monitoringDevice.name.contains=${queryTrimmed}`;
      queries += `&any.vehicle.monitoringDevice.serialNumber.contains=${queryTrimmed}`;
      queries += `&any.vehicle.manufacturer.contains=${queryTrimmed}`;
      queries += `&any.vehicle.model.contains=${queryTrimmed}`;
      queries += `&any.vehicle.registrationNumber.contains=${queryTrimmed}`;
      queries += `&any.driver.userAccount.lastName.contains=${queryTrimmed}`;
    }

    if (selectedBranch) {
      queries += `&all.vehicle.assignment.branch.id.equals=${selectedBranch.id}`;
    } else {
      queries += `&all.vehicle.assignment.branch.id.equals=10`;
    }

    const { promise, controller } = AttachmentsApi.getList({
      page: page - 1,
      limit,
      queries,
    });

    lastGetAttachmentsListRequest.setState(controller);

    return promise
      .then(({ res, headers }) => {
        const total = +headers?.get('X-Total-Count') ?? 0;
        attachmentsLoadingState.setState(false);
        lastGetAttachmentsListRequest.setState(null);

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
        attachmentsLoadingState.setState(false);
        lastGetAttachmentsListRequest.setState(null);
        console.log(err);
        throw err;
      });
  },
);

export const deleteAttachment = createEffect((id) => {
  const { promise } = AttachmentsApi.deleteItem(id);

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    });
});

export const addAttachment = createEffect((data) => {
  creatingAttachmentLoadingState.setState(true);
  const { promise } = AttachmentsApi.createItem(AttachmentsMapper.getAttachmentToApi(data));

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => creatingAttachmentLoadingState.setState(false));
});

export const getAttachment = createEffect((id) => {
  loadingAttachmentDataState.setState(true);
  const lastRequest = lastGetAttachmentDataRequest.$store.getState();
  lastRequest?.abort();

  const { promise, controller } = AttachmentsApi.getItem(id);
  lastGetAttachmentDataRequest.setState(controller);

  return promise
    .then(({ res }) => {
      loadingAttachmentDataState.setState(false);
      lastGetAttachmentDataRequest.setState(null);
      return AttachmentsMapper.getAttachmentFromApi(res);
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      loadingAttachmentDataState.setState(false);
      lastGetAttachmentDataRequest.setState(null);
      throw err;
    });
});

export const changeAttachment = createEffect((payload) => {
  changingAttachmentLoadingState.setState(true);
  const { promise } = AttachmentsApi.changeItem(
    payload.id,
    AttachmentsMapper.getAttachmentToApi(payload.data),
  );

  return promise
    .then(({ res }) => res)
    .catch((err) => {
      throw err;
    })
    .finally(() => changingAttachmentLoadingState.setState(false));
});
