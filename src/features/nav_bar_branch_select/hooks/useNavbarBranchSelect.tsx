import { useEffect } from 'react';

import { storageKeys } from '@shared/const/storageKeys';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { appStore } from '@shared/model/app_store/AppStore';
import type { Value } from '@shared/ui/search_multiple_select';
import ArrayUtils from '@shared/utils/ArrayUtils';

import { useUserDataApi } from '../api/useUserDataApi';

export const useNavbarBranchSelect = () => {
  const { selectedBranchState, setState, isAdmin } = appStore((state) => state);
  const { user } = useUserDataApi();

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
