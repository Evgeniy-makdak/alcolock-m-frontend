import { useState } from 'react';

import { useAlcolockListQuery } from '../api/alcolockListQuery';
import { mapOptions } from '../lib/mapOptions';

export const useAlcolockSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const { data, isLoading } = useAlcolockListQuery({ searchQuery });
  const onReset = () => {
    setSearchQuery('');
  };

  const alcolockList = mapOptions(data);
  return { onChange, isLoading, onReset, alcolockList };
};
