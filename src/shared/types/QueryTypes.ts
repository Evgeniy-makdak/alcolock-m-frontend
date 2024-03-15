import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type { GridSortDirection } from '@mui/x-data-grid';

import type { SortTypes } from '@shared/const/types';
import type { QueryObserverResult } from '@tanstack/react-query';

import type { ID } from './BaseQueryTypes';

export type RefetchType<T> = () => Promise<
  QueryObserverResult<
    | AxiosResponse<T, any>
    | {
        data: any;
      },
    Error
  >
>;

export interface QueryOptions {
  page?: number;
  equals?: string;
  limit?: number | string;
  sortBy?: SortTypes | string;
  searchQuery?: string;
  order?: GridSortDirection;
  startDate?: string;
  endDate?: string;
  selectedBranch?: ID;
  filterOptions?: {
    drivers?: string;
    users?: string;
    brandCar?: string;
    gosNumber?: string;
    typeOfEvent?: string;
    cars?: string;
    alcolock?: string;
    createLink?: string;
    dateLink?: string;
    carsByMake?: string;
    carsByLicense?: string;
    eventsByType?: string;
    branchId?: ID;
    notBranchId?: ID;
    groupId?: string;
    excludeId?: ID;
    driverSpecified?: boolean;
  };
  id?: ID;
  headers?: HeaderReq;
}

export type HeaderReq = AxiosRequestConfig['headers'];
