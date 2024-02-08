import { useState } from 'react';

import { useCarListQuery } from '../api/carListQuery';
import { mapOptions } from '../lib/mapOptions';

export const useCarsSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const onReset = () => {
    setSearchQuery('');
  };
  const { data, isLoading } = useCarListQuery({ searchQuery });

  const carList = mapOptions(data);
  return { onChange, onReset, isLoading, carList };
};
