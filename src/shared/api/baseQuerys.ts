import type { AxiosRequestConfig } from 'axios';

import { userState } from '@features/menu_button/model/store';
import { lastGetVehiclesListRequestState } from '@pages/vehicles/model/store';

import { SortTypes } from '../const/types';
import { selectedBranchState } from '../model/selected_branch/store';
import {
  type AttachmentsCreateData,
  type IAccount,
  type IAlcolocks,
  type IAttachmentItems,
  ICar,
  type ID,
  type IDeviceAction,
  IUser,
} from '../types/BaseQueryTypes';
import type { QueryOptions } from '../types/QueryTypes';
import { Formatters } from '../utils/formatters';
import { deleteQuery, getQuery, postQuery } from './baseQuery';

export type PartialQueryOptions = Partial<QueryOptions>;

const getSortQueryAttachments = (orderType: SortTypes, order: string) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case SortTypes.byName:
      return '';
    case SortTypes.bySerial:
      return `&sort=vehicle.monitoringDevice.serialNumber${orderStr}`;
    case SortTypes.byCar:
      return `&sort=vehicle.manufacturer,vehicle.model,vehicle.registrationNumber${orderStr}`;
    case SortTypes.byDriver:
      return `&sort=driver.userAccount.firstName,driver.userAccount.lastName${orderStr}`;
    case SortTypes.byUser:
      return `&sort=createdBy.firstName,createdBy.lastName${orderStr}`;
    case SortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    default:
      return '';
  }
};

export class AttachmentsApi {
  private static getAttachmentsDeleteItemURL = (id: number) => {
    return `api/vehicle-driver-allotments/${id}`;
  };
  private static getAttachmentURL({
    endDate,
    limit,
    order,
    page,
    searchQuery,
    sortBy,
    startDate,
  }: PartialQueryOptions) {
    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');
    let queries = '';
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };

    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      const date = new Date(endDate).toISOString();
      queries += `&all.createdAt.lessThanOrEqual=${date}`;
    }

    if (sortBy && order) {
      queries += getSortQueryAttachments(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.vehicle.monitoringDevice.match.contains=${queryTrimmed}`;
      queries += `&any.vehicle.match.contains=${queryTrimmed}`;
      queries += `&any.driver.userAccount.match.contains=${queryTrimmed}`;
    }

    if (selectedBranch) {
      queries += `&all.vehicle.assignment.branch.id.equals=${selectedBranch.id}`;
    } else {
      queries += `&all.vehicle.assignment.branch.id.equals=10`;
    }
    return `api/vehicle-driver-allotments?page=${page || 0}&size=${limit}${queries}`;
  }

  static getList(options: PartialQueryOptions) {
    const url = this.getAttachmentURL(options);
    return getQuery<IAttachmentItems[]>({ url });
  }

  static getCreateAttachmentApiURL = () => {
    return 'api/vehicle-driver-allotments';
  };

  static createItem(data: AttachmentsCreateData, headers?: AxiosRequestConfig['headers']) {
    return postQuery({ url: this.getCreateAttachmentApiURL(), data, headers });
  }
  // static createItem(data: any) {
  //   const params = {
  //     url: `api/vehicle-driver-allotments`,
  //     method: 'POST',
  //     data,
  //   };
  // }

  // static getItem(id: string | number) {
  //   const params = {
  //     url: `api/vehicle-driver-allotments/${id}`,
  //     method: 'GET',
  //   };
  // }

  // static changeItem(id: string | number, data) {
  //   const params = {
  //     url: `api/vehicle-driver-allotments/${id}`,
  //     method: 'PUT',
  //     data,
  //   };
  // }

  static deleteItem(id: number, headers?: AxiosRequestConfig['headers']) {
    return deleteQuery<void>({ url: this.getAttachmentsDeleteItemURL(id), headers });
  }
}

export class UsersApi {
  private static getUserListURL = ({ page, limit, searchQuery }: PartialQueryOptions) => {
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };
    const trimmedQuery = Formatters.removeExtraSpaces(searchQuery ?? '');
    let queries = '&sort=lastName,ASC';

    queries += `&all.driver.id.specified=true`;

    if (trimmedQuery) {
      queries += `&any.match.contains=${trimmedQuery}`;
    }

    if (selectedBranch) {
      queries += `&all.assignment.branch.id.equals=${selectedBranch.id}`;
    } else {
      queries += `&all.assignment.branch.id.equals=10`;
    }
    return `api/users?page=${page || 0}&size=${limit || 20}${queries}`;
  };

  static getList(options: PartialQueryOptions) {
    return getQuery<IUser[]>({ url: this.getUserListURL(options) });
  }
}

const getSortQueryCar = (orderType: SortTypes, order: string) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case SortTypes.byMake:
      return `&sort=manufacturer${orderStr}`;
    case SortTypes.byModel:
      return `&sort=model${orderStr}`;
    case SortTypes.byVin:
      return `&sort=vin${orderStr}`;
    case SortTypes.byLicense:
      return `&sort=registrationNumber${orderStr}`;
    case SortTypes.byManufacture:
      return `&sort=year${orderStr}`;
    case SortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    default:
      return '';
  }
};

export class CarsApi {
  private static getMarksCarURL = ({ page, limit, searchQuery }: PartialQueryOptions) => {
    const trimmedQuery = Formatters.removeExtraSpaces(searchQuery ?? '');
    let queries = '&sort=match,ASC';

    if (trimmedQuery) {
      queries += `&match=${trimmedQuery}`;
    }
    return `api/vehicles/manufacturers?page=${page || 0}&size=${limit || 20}${queries}`;
  };
  private static getCarListURL = ({
    page,
    limit,
    sortBy,
    order,
    searchQuery,
    startDate,
    endDate,
    id,
  }: PartialQueryOptions): string => {
    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');
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
      const date = new Date(endDate).toISOString();
      queries += `&all.createdAt.lessThanOrEqual=${date}`;
    }

    if (sortBy && order) {
      queries += getSortQueryCar(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.match.contains=${queryTrimmed}`;
      // TODO написать более подходящую реализацию формирования query параметров
      // сейчас у каждого запроса (машин или гос номеров) есть специфика по формированию параметров
      !sortBy && (queries += `&any.vin.contains=${queryTrimmed}`);
    }

    if (id) {
      queries += `&all.assignment.branch.id.in=${id}`;
    } else {
      if (selectedBranch) {
        queries += `&all.assignment.branch.id.equals=${selectedBranch.id}`;
      } else {
        queries += `&all.assignment.branch.id.equals=10`;
      }
    }
    return `api/vehicles?page=${page || 0}&size=${limit || 20}${queries}`;
  };

  static getCarsList(options: PartialQueryOptions) {
    return getQuery<ICar[]>({ url: this.getCarListURL(options) });
  }

  static getMarksCarList(options: PartialQueryOptions) {
    return getQuery<string[]>({ url: this.getMarksCarURL(options) });
  }
}

const getSortQueryAlcoloks = (orderType: SortTypes, order: string) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case SortTypes.byName:
      return `&sort=name${orderStr}`;
    case SortTypes.bySerial:
      return `&sort=serialNumber${orderStr}`;
    case SortTypes.byCar:
      return `&sort=vehicleBind.vehicle.manufacturer,vehicleBind.vehicle.model,vehicleBind.vehicle.registrationNumber${orderStr}`;
    case SortTypes.byUser:
      return '';
    case SortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    case SortTypes.byMode:
      return `&sort=mode${orderStr}`;
    default:
      return '';
  }
};

export class AlcolocksApi {
  private static getAlcolocksURL({
    page,
    limit,
    searchQuery,
    startDate,
    endDate,
    order,
    sortBy,
  }: PartialQueryOptions) {
    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');
    let queries = '';

    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      const date = new Date(endDate).toISOString();
      queries += `&all.createdAt.lessThanOrEqual=${date}`;
    }

    if (sortBy && order) {
      queries += getSortQueryAlcoloks(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.vehicleBind.vehicle.match.contains=${queryTrimmed}`;
      queries += `&any.match.contains=${queryTrimmed}`;
      queries += `&any.createdBy.match.contains=${queryTrimmed}`;
    }
    return `api/monitoring-devices?page=${page || 0}&size=${limit || 20}${queries}`;
  }

  static getList(options: PartialQueryOptions) {
    return getQuery<IAlcolocks[]>({ url: this.getAlcolocksURL(options) });
  }
}

const getSortQuery = (orderType: SortTypes, order: string) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case SortTypes.byUserName:
      return `&sort=createdBy.lastName${orderStr}`;
    case SortTypes.byCarMake:
      return `&sort=vehicleRecord.manufacturer${orderStr}`;
    case SortTypes.byCarLicense:
      return `&sort=vehicleRecord.registrationNumber${orderStr}`;
    case SortTypes.byEventType:
      return `&sort=type${orderStr}`;
    case SortTypes.byDate:
      return `&sort=createdAt${orderStr}`;
    default:
      return '';
  }
};

interface EventsOptions extends PartialQueryOptions {
  userId: ID;
  carId: ID;
  alcolockId: ID;
}

export interface ActivateServiceModeOptions {
  duration: number | undefined | null;
  deviceId: ID;
  isDeactivate: boolean;
}

export class EventsApi {
  // TODO => написать общую функцию по формированию query параметров
  private static getEventsApiURL({
    page,
    limit,
    searchQuery,
    startDate,
    endDate,
    order,
    sortBy,
    filterOptions,
  }: PartialQueryOptions) {
    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');
    let queries = '';
    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };

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

    if (filterOptions) {
      if ((filterOptions?.users ?? '').length) {
        queries += `&any.events.user.id.in=${filterOptions.users}`;
      }

      if ((filterOptions?.carsByMake ?? '').length) {
        queries += `&any.vehicleRecord.manufacturer.in=${filterOptions.carsByMake}`;
      }

      if ((filterOptions?.carsByLicense ?? '').length) {
        queries += `&any.vehicleRecord.registrationNumber.in=${filterOptions.carsByLicense}`;
      }

      if ((filterOptions?.eventsByType ?? '').length) {
        queries += `&any.type.in=${filterOptions.eventsByType}`;
      }
    }
    return `api/device-actions?page=${page || 0}&size=${limit || 20}${queries}`;
  }

  private static getEventListForAutoServiceURL({
    page,
    limit,
    searchQuery,
    startDate,
    endDate,
    order,
    sortBy,
  }: PartialQueryOptions) {
    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');
    let queries =
      '&all.type.in=SERVICE_MODE_ACTIVATE,SERVICE_MODE_DEACTIVATE&all.seen.in=false&all.events.eventType.notEquals=TIMEOUT&all.status.notIn=INVALID';

    const userData = userState.$store.getState();
    const selectedBranch = userData?.isAdmin
      ? selectedBranchState.$store.getState()
      : userData?.assignment.branch ?? { id: 10 };

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
      queries += `&any.device.serialNumber.contains=${queryTrimmed}`;
      queries += `&any.createdBy.match.contains=${queryTrimmed}`;
      queries += `&any.vehicleRecord.match.contains=${queryTrimmed}`;
    }

    if (selectedBranch) {
      queries += `&all.device.assignment.branch.id.equals=${selectedBranch.id}`;
    } else {
      queries += `&all.device.assignment.branch.id.equals=10`;
    }
    return `api/device-actions?page=${page || 0}&size=${limit || 20}${queries}`;
  }

  private static getEventsHistoryURL({ alcolockId, carId, userId, page, limit }: EventsOptions) {
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
    return `api/device-actions?page=${page}&size=${limit}${queries}`;
  }

  static getList(options: PartialQueryOptions) {
    return getQuery<IDeviceAction[]>({ url: this.getEventsApiURL(options) });
  }
  static getEventItem(id: string | number) {
    return getQuery<IDeviceAction>({ url: `api/device-actions/${id}` });
  }
  static getEventListForAutoService(options: PartialQueryOptions) {
    return getQuery<IDeviceAction[]>({ url: this.getEventListForAutoServiceURL(options) });
  }

  static getEventsHistory(options: EventsOptions) {
    return getQuery<IDeviceAction[]>({ url: this.getEventsHistoryURL(options) });
  }

  static activateServiceMode({
    duration,
    deviceId,
    isDeactivate = false,
  }: ActivateServiceModeOptions) {
    const requestData = isDeactivate
      ? {
          deviceId,
          type: 'SERVICE_MODE_DEACTIVATE',
        }
      : {
          duration: duration * 3600,
          deviceId,
          type: 'SERVICE_MODE_ACTIVATE',
        };
    return postQuery<IDeviceAction, any>({ url: `api/device-actions`, data: requestData });
  }
  static cancelActivateService(id: ID) {
    return postQuery<IDeviceAction, any>({ url: `api/device-actions/${id}/cancel` });
  }

  static rejectActivateService(id: ID) {
    return postQuery<IDeviceAction, any>({ url: `api/device-actions/${id}/reject` });
  }

  static acceptActivateService(id: ID) {
    return postQuery<IDeviceAction, any>({ url: `api/device-actions/${id}/accept` });
  }
  static seenAutoService(id: ID) {
    return postQuery<IDeviceAction, any>({ url: `api/device-actions/${id}/seen` });
  }
}

export class AccountApi {
  private static getAccountURL() {
    return `api/account`;
  }

  static getAccountData() {
    return getQuery<IAccount>({ url: this.getAccountURL() });
  }
}
