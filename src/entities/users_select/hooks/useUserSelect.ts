import { useState } from 'react';

import { useUserListQuery } from '../api/userListQuery';
import { mapOptions } from '../lib/mapOptions';

export const useUserSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const { data, isLoading } = useUserListQuery({ searchQuery });
  const onReset = () => {
    setSearchQuery('');
  };
  const driversList = mapOptions(data);
  return { onChange, isLoading, onReset, driversList };
};
