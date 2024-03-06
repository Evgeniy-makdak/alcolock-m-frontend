import { useState } from 'react';

import { AttachmentsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { mapOptions } from '@shared/ui/search_multiple_select';
import { useQuery } from '@tanstack/react-query';

import { adapterMapOptions } from '../lib/adapterMapOptions';

export const useDateOfLinkSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.ATTACHMENT_LIST],
    queryFn: () => AttachmentsApi.getList({ searchQuery }),
  });
  const onReset = () => {
    setSearchQuery('');
  };

  const dateCreate = mapOptions(data?.data, adapterMapOptions);
  return { onChange, isLoading, onReset, dateCreate };
};
