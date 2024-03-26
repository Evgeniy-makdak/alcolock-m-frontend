import type { AxiosError } from 'axios';

import type { QueryKeys } from '@shared/const/storageKeys';
import { appStore } from '@shared/model/app_store/AppStore';
import type { ID, IError } from '@shared/types/BaseQueryTypes';
import type { QueryOptions } from '@shared/types/QueryTypes';
import { type QueryKey, type UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

const isOptionsValue = (options: QueryOptions | ID): options is QueryOptions => {
  if (typeof options === 'object') return true;
  return false;
};

const getOptions = (options: QueryOptions, queryBranch: ID): QueryOptions => {
  const filterOp = (options && options?.filterOptions) || {};
  return {
    ...options,
    filterOptions: {
      ...filterOp,
      branchId: queryBranch,
    },
  };
};

export const useConfiguredQuery = <T, D extends QueryOptions>(
  key: QueryKeys[],
  fn: (options?: QueryOptions | ID) => Promise<T>,
  options?: QueryOptions | ID | D,
  settings?: Omit<
    UndefinedInitialDataOptions<T, AxiosError<IError>, T, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const isOptions = isOptionsValue(options);
  const filterOptions = isOptions && options?.filterOptions;
  const branchId = filterOptions && filterOptions?.branchId;
  const selectedBranchState = appStore((state) => state.selectedBranchState);
  const queryBranch = branchId ? branchId : selectedBranchState?.id;
  const newOptions = isOptions ? getOptions(options, queryBranch) : options;

  const data = useQuery<T, AxiosError<IError>, T, QueryKey>({
    queryKey: [...key, queryBranch, ...[isOptions ? Object.values(newOptions) : newOptions]],
    queryFn: () => fn(newOptions ? newOptions : {}),
    ...(settings || {}),
  });

  return data;
};
