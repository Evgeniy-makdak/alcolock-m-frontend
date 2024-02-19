import { useState } from 'react';

import { mapOptions } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useAlcolockListQuery } from '../api/alcolockListQuery';
import { adapterMapOptions } from '../lib/adapterMapOptions';

export const useAlcolockSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const { data, isLoading } = useAlcolockListQuery({ searchQuery });
  const onReset = () => {
    setSearchQuery('');
  };

  const alcolockList = mapOptions(data, adapterMapOptions);
  return { onChange, isLoading, onReset, alcolockList };
};
