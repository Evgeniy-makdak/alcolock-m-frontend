import { useMemo, useState } from 'react';

import { AttachmentsApi, QueryKeys } from '@shared/api/baseQuerys';
import { useQuery } from '@tanstack/react-query';

import { mapUsersCreateAttach } from '../lib/mapUsersCreateAttach';

export const useUsersCreateAttachSelect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (value: string) => {
    setSearchQuery(value);
  };

  const onReset = () => {
    setSearchQuery('');
  };

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.ATTACHMENT_LIST],
    queryFn: () => AttachmentsApi.getList({ searchQuery }),
  });

  const createdBy = useMemo(() => mapUsersCreateAttach(data?.data || []), [data]);
  return { isLoading, onReset, onChange, createdBy };
};
