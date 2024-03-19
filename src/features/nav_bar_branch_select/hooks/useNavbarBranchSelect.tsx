import { useEffect } from 'react';

import { QueryKeys, storageKeys } from '@shared/const/storageKeys';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { useUpdateQueries } from '@shared/hooks/useUpdateQuerys';
import { appStore } from '@shared/model/app_store/AppStore';
import type { Value } from '@shared/ui/search_multiple_select';
import ArrayUtils from '@shared/utils/ArrayUtils';

import { useUserDataApi } from '../api/useUserDataApi';

// обновление запросов при изменении филиала
const updateQ = [
  QueryKeys.ALCOLOCK_LIST,
  QueryKeys.ALKOLOCK_LIST_TABLE,
  QueryKeys.ATTACHMENT_LIST,
  QueryKeys.AUTO_SERVICE_EVENTS_LIST,
  QueryKeys.CAR_LIST,
  QueryKeys.DRIVER_LIST,
  QueryKeys.EVENTS_COUNT,
  QueryKeys.EVENTS_LIST,
  QueryKeys.EVENTS_LIST_HISTORY,
  QueryKeys.USER_LIST,
  QueryKeys.VEHICLES_PAGE_TABLE,
  QueryKeys.USER_LIST_TABLE,
  QueryKeys.USER_LIST,
];

export const useNavbarBranchSelect = () => {
  const { selectedBranchState, setState, isAdmin } = appStore((state) => state);
  const { user } = useUserDataApi();
  const update = useUpdateQueries();
  const { state: office, setItemState: setOffice } = useLocalStorage({
    key: storageKeys.OFFICE,
    value: user?.assignment?.branch,
  });

  const onChangeBranch = (_type: string, value: string | Value | (string | Value)[]) => {
    if (!isAdmin) return;
    const arrVal = ArrayUtils.getArrayValues(value);

    if (arrVal.length === 0) return;

    const selectedBranchState = {
      id: arrVal[0].value,
      name: arrVal[0].label,
    };
    setState({
      selectedBranchState,
    });
    setOffice(selectedBranchState);
    update(updateQ);
  };

  useEffect(() => {
    if (!user) return;
    setState({ selectedBranchState: isAdmin ? office : user?.assignment?.branch });
  }, [user, isAdmin]);

  return {
    value: [
      {
        value: selectedBranchState?.id,
        label: selectedBranchState?.name,
      },
    ],
    isAdmin,
    onChangeBranch,
  };
};
