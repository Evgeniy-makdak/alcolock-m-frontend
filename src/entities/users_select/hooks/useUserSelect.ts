import { useState } from 'react';

import type { ID } from '@shared/types/BaseQueryTypes';
import { mapOptions } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useUserListQuery } from '../api/userListQuery';
import { adapterMapOptions } from '../lib/adapterMapOptions';

export const useUserSelect = (sort = false, vieBranch = false, branchId?: ID, notInBranch?: ID) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const { data, isLoading } = useUserListQuery({
    searchQuery,
    filterOptions: { branchId: branchId, notBranchId: notInBranch },
  });
  const onReset = () => {
    setSearchQuery('');
  };
  const driversList = mapOptions(data, (user) => adapterMapOptions(user, vieBranch)).sort(
    (a, b) => {
      if (sort) {
        return a.label[0] < b.label[0] ? -1 : 1;
      }
      return 0;
    },
  );
  return { onChange, isLoading, onReset, driversList };
};
