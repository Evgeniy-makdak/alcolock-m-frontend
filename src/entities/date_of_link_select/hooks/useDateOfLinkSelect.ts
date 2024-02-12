import { useState } from 'react';

import { AttachmentsApi, QueryKeys } from '@shared/api/baseQuerys';
import { useQuery } from '@tanstack/react-query';

import { mapOptions } from '../lib/mapOptions';

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

  const dateCreate = mapOptions(data?.data || []);
  return { onChange, isLoading, onReset, dateCreate };
};
