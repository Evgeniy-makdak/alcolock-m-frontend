import { useEffect } from 'react';

import { Permissions } from '@shared/config/permissionsEnums';
import { StorageKeys } from '@shared/const/storageKeys';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { appStore } from '@shared/model/app_store/AppStore';
import type { Value } from '@shared/ui/search_multiple_select';
import ArrayUtils from '@shared/utils/ArrayUtils';

import { useUserDataApi } from '../api/useUserDataApi';

export const useNavbarBranchSelect = () => {
  const { selectedBranchState, setState } = appStore((state) => state);
  const { user } = useUserDataApi();
  const isGlobalAdmin = user ? user?.permissions?.includes(Permissions.SYSTEM_GLOBAL_ADMIN) : false;
  const { state: office, setItemState: setOffice } = useLocalStorage({
    key: StorageKeys.OFFICE,
    value: user?.assignment?.branch,
  });

  const onChangeBranch = (_type: string, value: string | Value | (string | Value)[]) => {
    if (!isGlobalAdmin) return;
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
  };

  useEffect(() => {
    if (!user) return;
    setState({
      selectedBranchState: isGlobalAdmin ? office : user?.assignment?.branch,
      isAdmin: isGlobalAdmin,
    });
  }, [user]);

  return {
    value: [
      {
        value: selectedBranchState?.id,
        label: selectedBranchState?.name,
      },
    ],
    isGlobalAdmin,
    onChangeBranch,
  };
};
