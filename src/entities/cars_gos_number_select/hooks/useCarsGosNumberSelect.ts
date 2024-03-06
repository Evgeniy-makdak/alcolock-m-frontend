import { useState } from 'react';

import { SortTypes, SortsTypes } from '@shared/const/types';
import { mapOptions } from '@shared/ui/search_multiple_select';

import { useCarListQuery } from '../api/useCarListQuery';
import { adapterMapOptions } from '../lib/adapterMapOptions';

export const useCarsGosNumberSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const onReset = () => {
    setSearchQuery('');
  };

  const { data, isLoading } = useCarListQuery({
    searchQuery,
    sortBy: SortTypes.byLicense,
    order: SortsTypes.asc,
  });

  const carList = mapOptions(data, adapterMapOptions);
  return { onChange, onReset, isLoading, carList };
};
