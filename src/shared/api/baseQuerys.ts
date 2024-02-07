import type { AxiosRequestConfig } from 'axios';

import { userState } from '@features/menu_button/model/store';
import { lastGetVehiclesListRequestState } from '@pages/vehicles/model/store';
import { SortTypes } from '@shared/const/types';
import { selectedBranchState } from '@shared/model/selected_branch/store';
import { Formatters } from '@shared/utils/formatters';

import { QueryOptions, deleteQuery, getQuery, postQuery } from './baseQuery';
import { type IAlcolocks, ICar, IUser } from './baseTypes';

export enum QueryKeys {
  USER_LIST = 'USER_LIST',
  DRIVER_LIST = 'DRIVER_LIST',
  CAR_LIST = 'CAR_LIST',
  ATTACHMENT_LIST = 'ATTACHMENT_LIST',
  ALCOLOCK_LIST = 'ALCOLOCK_LIST',
}

export interface IAttachmentItems {
  createdAt: string;
  createdBy: IUser;
  id: number;
  driver: {
    id: number;
    licenseClass: string[];
    licenseCode: string;
    licenseExpirationDate: string;
    licenseIssueDate: string;
    userAccount: IUser;
  };
  vehicle: ICar;
}

export interface AttachmentsCreateData {
  driverId: number;
  vehicleId: number;
}

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
  static getAttachmentsDeleteItemURL = (id: number) => {
    return `api/vehicle-driver-allotments/${id}`;
  };
  static getAttachmentURL({
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

  static createItem(
    url: string,
    data: AttachmentsCreateData,
    headers?: AxiosRequestConfig['headers'],
  ) {
    return postQuery<void, AttachmentsCreateData>({ url, data, headers });
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
  static getUserListURL = ({ page, limit, searchQuery }: PartialQueryOptions) => {
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
  static getCarListURL = ({
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
      queries += `&any.vin.contains=${queryTrimmed}`;
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
  static getAlcolocksURL({
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
