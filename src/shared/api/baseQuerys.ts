import type { AxiosRequestConfig } from 'axios';

import type { GridSortDirection } from '@mui/x-data-grid';

import { userState } from '@features/menu_button/model/store';
import { lastGetVehiclesListRequestState } from '@pages/vehicles/model/store';
import { DateUtils } from '@shared/utils/DateUtils';

import { SortTypes } from '../const/types';
import { selectedBranchState } from '../model/selected_branch/store';
import {
  type AttachmentsCreateData,
  type IAccount,
  type IAlcolock,
  type IAttachmentItems,
  type IBranch,
  ICar,
  type ID,
  type IDeviceAction,
  IUser,
} from '../types/BaseQueryTypes';
import type { QueryOptions } from '../types/QueryTypes';
import { Formatters } from '../utils/formatters';
import { deleteQuery, getQuery, postQuery, putQuery } from './baseQueryTypes';

export type PartialQueryOptions = Partial<QueryOptions>;

const getSelectBranchQueryUrl = ({
  page,
  parameters,
  otherBranch,
  notBranch,
}: {
  page?: string;
  parameters?: string;
  otherBranch?: ID;
  notBranch?: ID;
}) => {
  const userData = userState.$store.getState();
  const selectedBranch = userData?.isAdmin
    ? selectedBranchState.$store.getState()
    : userData?.assignment.branch ?? { id: 10 };

  let branch = `assignment.branch.id.equals=${selectedBranch.id}`;

  if (otherBranch && !notBranch) {
    branch = `assignment.branch.id.in=${otherBranch}`;
  } else if (notBranch) {
    branch = `all.assignment.branch.id.notEquals=${notBranch}`;
  }

  return `${parameters ? parameters : ''}&all.${page ? page + '.' : ''}${branch}`;
};

export class AttachmentsApi {
  private static getSortQueryAttachments = (
    orderType: SortTypes | string,
    order: GridSortDirection,
  ) => {
    const orderStr = ',' + order.toUpperCase();

    switch (orderType) {
      case SortTypes.SERIAL_NUMBER:
        return `&sort=vehicle.monitoringDevice.serialNumber${orderStr}`;
      case SortTypes.NAMING:
        return '';
      case SortTypes.TC:
        return `&sort=vehicle.manufacturer,vehicle.model,vehicle.registrationNumber${orderStr}`;
      case SortTypes.DRIVER:
        return `&sort=driver.userAccount.firstName,driver.userAccount.lastName${orderStr}`;
      case SortTypes.WHO_LINK:
        return `&sort=createdBy.firstName,createdBy.lastName${orderStr}`;
      case SortTypes.DATE_CREATE:
        return `&sort=createdAt${orderStr}`;
      default:
        return '';
    }
  };
  private static getAttachmentsDeleteItemURL = (id: ID) => {
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
    filterOptions,
  }: PartialQueryOptions) {
    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');
    let queries = getSelectBranchQueryUrl({ page: 'vehicle' });
    const drivers = filterOptions?.drivers;
    const tc = filterOptions?.cars;
    const createAttach = filterOptions?.createLink;
    const alcolock = filterOptions?.alcolock;
    const dateLink = filterOptions?.dateLink;

    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      queries += `&all.createdAt.lessThan=${DateUtils.getEndFilterDate(endDate)}`;
    }

    if (sortBy && order) {
      queries += this.getSortQueryAttachments(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.vehicle.monitoringDevice.match.contains=${queryTrimmed}`;
      queries += `&any.vehicle.match.contains=${queryTrimmed}`;
      queries += `&any.driver.userAccount.match.contains=${queryTrimmed}`;
    }

    if (!!drivers) {
      queries += `&any.vehicle.driver.id.in=${drivers}`;
    }
    if (!!tc) {
      queries += `&any.vehicle.registrationNumber.match=${tc}`;
    }
    if (!!createAttach) {
      queries += `&any.vehicle.createdBy.id.in=${createAttach}`;
    }
    if (!!alcolock) {
      queries += `&any.vehicle.monitoringDevice.id.in=${alcolock}`;
    }
    if (!!dateLink) {
      queries += `&any.vehicle.createdAt.match=${dateLink}`;
    }
    return `api/vehicle-driver-allotments?page=${page || 0}&size=${limit || 25}${queries}`;
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

  static deleteItem(id: ID, headers?: AxiosRequestConfig['headers']) {
    return deleteQuery<void>({ url: this.getAttachmentsDeleteItemURL(id), headers });
  }
}

export class UsersApi {
  private static getUserListURL = (
    { page, limit, searchQuery, filterOptions, sortBy, order }: PartialQueryOptions,
    widthCars: boolean,
  ) => {
    const branchId = filterOptions && filterOptions?.branchId;
    const notBranchId = filterOptions && filterOptions?.notBranchId;

    const trimmedQuery = Formatters.removeExtraSpaces(searchQuery ?? '');

    let queries = getSelectBranchQueryUrl({
      parameters: `&all.driver.id.specified=true`,
      otherBranch: branchId,
      notBranch: notBranchId,
    });

    if (trimmedQuery) {
      queries += `&any.email.contains=${trimmedQuery}`;
    }

    if (sortBy && order) {
      queries += getSortQuery(sortBy, order);
    }

    if (widthCars) {
      queries += `&all.driver.vehicleAllotments.include=true`;
    }

    return `api/users?page=${page || 0}&size=${limit || 20}${queries}`;
  };

  static getList(options: PartialQueryOptions, widthCars = false) {
    return getQuery<IUser[]>({ url: this.getUserListURL(options, widthCars) });
  }
  static switchBranch({ id, filterOptions: { branchId } }: PartialQueryOptions) {
    return postQuery<ICar, any>({ url: `api/users/${id}/assign/${branchId}` });
  }
}

export class CarsApi {
  private static getSortQueryCar = (orderType: SortTypes | string, order: GridSortDirection) => {
    const orderStr = ',' + order.toUpperCase();

    switch (orderType) {
      case SortTypes.MARK:
        return `&sort=manufacturer${orderStr}`;
      case SortTypes.MODEL:
        return `&sort=model${orderStr}`;
      case SortTypes.VIN:
        return `&sort=vin${orderStr}`;
      case SortTypes.GOS_NUMBER:
        return `&sort=registrationNumber${orderStr}`;
      case SortTypes.byManufacture:
        return `&sort=year${orderStr}`;
      case SortTypes.byDate:
        return `&sort=createdAt${orderStr}`;
      default:
        return '';
    }
  };
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
    filterOptions,
  }: PartialQueryOptions): string => {
    const branchId = filterOptions && filterOptions?.branchId;
    const notBranchId = filterOptions && filterOptions?.notBranchId;

    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');

    let queries = getSelectBranchQueryUrl({ otherBranch: branchId, notBranch: notBranchId });

    lastGetVehiclesListRequestState.$store.getState()?.abort();

    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      queries += `&all.createdAt.lessThan=${DateUtils.getEndFilterDate(endDate)}`;
    }

    if (sortBy && order) {
      queries += this.getSortQueryCar(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.match.contains=${queryTrimmed}`;
      // TODO написать более подходящую реализацию формирования query параметров
      // сейчас у каждого запроса (машин или гос номеров) есть специфика по формированию параметров
      !sortBy && (queries += `&any.vin.contains=${queryTrimmed}`);
    }
    return `api/vehicles?page=${page || 0}&size=${limit || 20}${queries}`;
  };

  private static getCarSwitchBranchUrl(options: PartialQueryOptions, isPairSwitch: boolean) {
    const carId = options?.id;
    const groupId = options?.filterOptions?.branchId;
    return `api/vehicles/${carId}/assign/${groupId}?withDevice=${isPairSwitch}`;
  }

  static getCarsList(options: PartialQueryOptions) {
    return getQuery<ICar[]>({ url: this.getCarListURL(options) });
  }

  static getMarksCarList(options: PartialQueryOptions) {
    return getQuery<string[]>({ url: this.getMarksCarURL(options) });
  }
  static switchBranch(options: PartialQueryOptions, isPairSwitch: boolean) {
    return postQuery<ICar, any>({ url: this.getCarSwitchBranchUrl(options, isPairSwitch) });
  }
}

export class AlcolocksApi {
  private static getSortQueryAlcoloks = (
    orderType: SortTypes | string,
    order: GridSortDirection,
  ) => {
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
      case SortTypes.WHO_LINK:
        return `&sort=createdBy.firstName,createdBy.lastName${orderStr}`;
      case SortTypes.OPERATING_MODE:
        return `&sort=mode${orderStr}`;
      case SortTypes.DATA_INSTALLATION:
        return `&sort=createdAt${orderStr}`;
      case SortTypes.NAMING:
        return `&sort=name${orderStr}`;
      case SortTypes.SERIAL_NUMBER:
        return `&sort=serialNumber${orderStr}`;
      case SortTypes.TC:
      default:
        return '';
    }
  };

  private static getAlcolocksURL({
    page,
    limit,
    searchQuery,
    startDate,
    endDate,
    order,
    sortBy,
    filterOptions,
  }: PartialQueryOptions) {
    const branchId = filterOptions && filterOptions?.branchId;
    const notBranchId = filterOptions && filterOptions?.notBranchId;
    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');
    let queries = getSelectBranchQueryUrl({
      otherBranch: branchId,
      notBranch: notBranchId,
    });

    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      queries += `&all.createdAt.lessThan=${DateUtils.getEndFilterDate(endDate)}`;
    }

    if (sortBy && order) {
      queries += this.getSortQueryAlcoloks(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.vehicleBind.vehicle.match.contains=${queryTrimmed}`;
      queries += `&any.match.contains=${queryTrimmed}`;
      queries += `&any.createdBy.match.contains=${queryTrimmed}`;
    }
    return `api/monitoring-devices?page=${page || 0}&size=${limit || 20}${queries}`;
  }

  private static getAlcolockListURL({
    page,
    limit,
    searchQuery,
    startDate,
    endDate,
    order,
    sortBy,
    filterOptions,
  }: PartialQueryOptions) {
    const branchId = filterOptions && filterOptions?.branchId;
    const notBranchId = filterOptions && filterOptions?.notBranchId;

    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');

    let queries = getSelectBranchQueryUrl({ otherBranch: branchId, notBranch: notBranchId });

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
      queries += `&any.vehicleBind.vehicle.match.contains=${queryTrimmed}`;
      queries += `&any.match.contains=${queryTrimmed}`;
      queries += `&any.createdBy.match.contains=${queryTrimmed}`;
    }

    return `api/monitoring-devices?page=${page}&size=${limit}${queries}`;
  }

  private static getAlkolockURL(id: ID) {
    return `api/monitoring-devices/${id}`;
  }

  private static getCreateAlkolocksURL() {
    return `api/monitoring-devices`;
  }

  static getList(options: PartialQueryOptions) {
    return getQuery<IAlcolock[]>({ url: this.getAlcolocksURL(options) });
  }
  static getListAlcolocks(options: PartialQueryOptions) {
    return getQuery<IAlcolock[]>({ url: this.getAlcolockListURL(options) });
  }
  static deleteAlkolock(id: ID) {
    return deleteQuery({ url: this.getAlkolockURL(id) });
  }

  static getAlkolock(id: ID) {
    return getQuery<IAlcolock>({ url: this.getAlkolockURL(id) });
  }

  static createItem(data: CreateAlcolockData) {
    return postQuery({ url: this.getCreateAlkolocksURL(), data });
  }
  static changeItem(data: CreateAlcolockData, id: ID) {
    return putQuery({ url: this.getAlkolockURL(id), data });
  }
  static switchBranch(
    { id, filterOptions: { branchId } }: PartialQueryOptions,
    withVehicle = false,
  ) {
    return postQuery<IAlcolock, any>({
      url: `api/monitoring-devices/${id}/assign/${branchId}?withVehicle=${withVehicle}`,
    });
  }
}

export interface CreateAlcolockData {
  vehicleId?: ID;
  branchId: ID;
  name: string;
  serviceId: string | number;
  serialNumber: number | string;
}

const getSortQuery = (orderType: SortTypes | string, order: GridSortDirection) => {
  const orderStr = ',' + order.toUpperCase();

  switch (orderType) {
    case SortTypes.NAMING:
      return `&sort=name${orderStr}`;
    case SortTypes.SERIAL_NUMBER:
      return `&sort=serialNumber${orderStr}`;
    case SortTypes.TC:
      return `&sort=vehicleBind.vehicle.manufacturer,vehicleBind.vehicle.model,vehicleBind.vehicle.registrationNumber${orderStr}`;
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
    case SortTypes.WHO_LINK:
      return `&sort=createdBy.firstName,createdBy.lastName${orderStr}`;
    case SortTypes.OPERATING_MODE:
      return `&sort=mode${orderStr}`;
    case SortTypes.DATA_INSTALLATION:
      return `&sort=createdAt${orderStr}`;
    case SortTypes.DATE_CREATE:
      return `&sort=createdAt${orderStr}`;
    case SortTypes.USER:
      return `&sort=lastName${orderStr}`;
    case SortTypes.EMAIL:
      return `&sort=email${orderStr}`;
    case SortTypes.CAR_LINK:
      return '';
    default:
      return '';
  }
};

export interface EventsOptions extends PartialQueryOptions {
  userId?: ID;
  carId?: ID;
  alcolockId?: ID;
}

export interface ActivateServiceModeOptions {
  duration: number | undefined | null;
  deviceId: ID;
  isDeactivate: boolean;
}

export class EventsApi {
  private static EVENTS_TYPES_BLACKLIST = ['SERVICE_MODE_ACTIVATE', 'SERVICE_MODE_DEACTIVATE'];
  private static getSortQueryEvents = (orderType: SortTypes | string, order: GridSortDirection) => {
    const orderStr = ',' + order.toUpperCase();

    switch (orderType) {
      case SortTypes.NAMING:
        return `&sort=name${orderStr}`;
      case SortTypes.SERIAL_NUMBER:
        return `&sort=device.serialNumber${orderStr}`;
      case SortTypes.TC:
        return `&sort=vehicleRecord.manufacturer${orderStr}`;
      case SortTypes.byCarMake:
        return `&sort=vehicleRecord.manufacturer${orderStr}`;
      case SortTypes.GOS_NUMBER:
        return `&sort=vehicleRecord.registrationNumber${orderStr}`;
      case SortTypes.TYPE_OF_EVENT:
        return `&sort=type${orderStr}`;
      case SortTypes.byDate:
        return `&sort=createdAt${orderStr}`;
      case SortTypes.WHO_LINK:
        return `&sort=createdBy.firstName,createdBy.lastName${orderStr}`;
      case SortTypes.OPERATING_MODE:
        return `&sort=mode${orderStr}`;
      case SortTypes.DATA_INSTALLATION:
        return `&sort=createdAt${orderStr}`;
      case SortTypes.DATE_CREATE:
        return `&sort=createdAt${orderStr}`;
      case SortTypes.DATE_OCCURRENT:
        return `&sort=events.occurredAt${orderStr}`;
      case SortTypes.CREATED_BY:
        return `&sort=createdBy.lastName${orderStr}`;
      default:
        return '';
    }
  };
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
    const blacklistEventsTypes = this.EVENTS_TYPES_BLACKLIST.join(',');
    let queries = getSelectBranchQueryUrl({
      parameters: `&all.type.notIn=${blacklistEventsTypes}`,
      page: 'device',
    });

    const users = filterOptions?.users;
    const carsByMake = filterOptions?.carsByMake;
    const carsByLicense = filterOptions?.carsByLicense;
    const eventsByType = filterOptions?.eventsByType;

    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      queries += `&all.createdAt.lessThan=${DateUtils.getEndFilterDate(endDate)}`;
    }

    if (sortBy && order) {
      queries += this.getSortQueryEvents(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.createdBy.match.contains=${queryTrimmed}`;
      queries += `&any.vehicleRecord.match.contains=${queryTrimmed}`;
    }

    if (!!users) {
      queries += `&any.events.user.id.in=${filterOptions.users}`;
    }

    if (!!carsByMake) {
      queries += `&any.vehicleRecord.manufacturer.in=${filterOptions.carsByMake}`;
    }

    if (!!carsByLicense) {
      queries += `&any.vehicleRecord.registrationNumber.in=${filterOptions.carsByLicense}`;
    }

    if (!!eventsByType) {
      queries += `&any.events.eventType.in=${filterOptions.eventsByType}`;
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
    let queries = getSelectBranchQueryUrl({
      parameters:
        '&all.type.in=SERVICE_MODE_ACTIVATE,SERVICE_MODE_DEACTIVATE&all.seen.in=false&all.events.eventType.notEquals=TIMEOUT&all.status.notIn=INVALID',
      page: 'device',
    });
    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.events.occurredAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      queries += `&all.events.occurredAt.lessThan=${DateUtils.getEndFilterDate(endDate)}`;
    }

    if (sortBy && order) {
      queries += this.getSortQueryEvents(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.device.serialNumber.contains=${queryTrimmed}`;
      queries += `&any.createdBy.match.contains=${queryTrimmed}`;
      queries += `&any.vehicleRecord.match.contains=${queryTrimmed}`;
    }

    return `api/device-actions?page=${page || 0}&size=${limit || 20}${queries}`;
  }

  private static getEventsHistoryURL({ alcolockId, carId, userId, page, limit }: EventsOptions) {
    let queries = getSelectBranchQueryUrl({
      page: 'device',
    });

    if (userId) {
      queries += `&all.events.user.id.equals=${userId}`;
    }

    if (carId) {
      queries += `&all.vehicle.id.in=${carId}`;
    }

    if (alcolockId) {
      queries += `&all.device.id.in=${alcolockId}`;
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

export class BranchApi {
  private static getBranchSortQuery = (orderType: SortTypes | string, order: GridSortDirection) => {
    const orderStr = ',' + order.toUpperCase();

    switch (orderType) {
      case SortTypes.NAMING:
        return `&sort=name,${orderStr}`;
      case SortTypes.WHO_CREATE:
        return `&sort=createdBy.lastName,${orderStr}`;
      case SortTypes.DATE_CREATE:
        return `&sort=createdAt,${orderStr}`;
      default:
        return '';
    }
  };
  private static getBranchListUrl = ({
    page,
    limit,
    sortBy,
    order,
    searchQuery,
    startDate,
    endDate,
    filterOptions,
  }: PartialQueryOptions) => {
    const queryTrimmed = Formatters.removeExtraSpaces(searchQuery ?? '');
    let queries = '';
    const excludeId = filterOptions && filterOptions?.excludeId ? filterOptions?.excludeId : null;

    if (startDate) {
      const date = new Date(startDate).toISOString();
      queries += `&all.createdAt.greaterThanOrEqual=${date}`;
    }

    if (endDate) {
      queries += `&all.createdAt.lessThan=${DateUtils.getEndFilterDate(endDate)}`;
    }

    if (sortBy && order) {
      queries += this.getBranchSortQuery(sortBy, order);
    }

    if (queryTrimmed.length) {
      queries += `&any.name.contains=${queryTrimmed}`;
    }

    if (excludeId) {
      queries += `&all.id.notIn=${excludeId}, 10`;
    }

    return `api/branch-offices?page=${page}&size=${limit}${queries}`;
  };
  static getBranchList(options: PartialQueryOptions) {
    return getQuery<IBranch[]>({ url: this.getBranchListUrl(options) });
  }
  static createBranch(name: string) {
    return postQuery<IBranch, { name: string }>({ data: { name }, url: `api/branch-offices` });
  }
  static deleteBranch(id: ID) {
    return deleteQuery<any>({ url: `api/branch-offices/${id}` });
  }
  static editBranch(id: ID, name: string) {
    return putQuery<IBranch, { id: ID; name: string }>({
      url: `api/branch-offices/${id}`,
      data: {
        id,
        name,
      },
    });
  }
  static getBranch(id: ID) {
    return getQuery<IBranch>({ url: `api/branch-offices/${id}` });
  }
  static moveItem(branchId: ID, ids: ID[]) {
    return postQuery({ url: `api/branch-offices/${branchId}/move`, data: { entities: ids } });
  }
}
