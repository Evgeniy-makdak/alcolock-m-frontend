import { useState } from 'react';

import { mapOptions } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useUserListQuery } from '../api/userListQuery';
import { adapterMapOptions } from '../lib/adapterMapOptions';

export const useUserSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const { data, isLoading } = useUserListQuery({ searchQuery });
  const onReset = () => {
    setSearchQuery('');
  };
  const driversList = mapOptions(data, adapterMapOptions);
  return { onChange, isLoading, onReset, driversList };
};
