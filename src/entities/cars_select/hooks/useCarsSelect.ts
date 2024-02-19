import { useState } from 'react';

import { mapOptions } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useCarListQuery } from '../api/useCarListQuery';
import { adapterMapOptions } from '../lib/adapterMapOptions';

export const useCarsSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const onReset = () => {
    setSearchQuery('');
  };
  const { data, isLoading } = useCarListQuery({ searchQuery });

  const carList = mapOptions(data, adapterMapOptions);
  return { onChange, onReset, isLoading, carList };
};
