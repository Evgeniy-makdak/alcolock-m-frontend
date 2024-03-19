import { useState } from 'react';

import { mapOptions } from '@shared/ui/search_multiple_select';

import { useRolesSelectApi } from '../api/useRolesSelectApi';
import { adapterMapOptions } from '../lib/adapterMapOptions';

export const useRolesSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const { data, isLoading } = useRolesSelectApi({
    searchQuery,
  });
  const onReset = () => {
    setSearchQuery('');
  };

  const roles = mapOptions(data, (alcolok) => adapterMapOptions(alcolok));
  return { onChange, isLoading, onReset, roles };
};
