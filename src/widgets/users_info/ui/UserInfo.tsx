import type { FC } from 'react';

import { Info } from '@entities/info';
import type { ID } from '@shared/types/BaseQueryTypes';
import { Loader } from '@shared/ui/loader';

import { useUserInfo } from '../hooks/useUserInfo';

type UserInfoProps = {
  selectedUserId: ID;
};

export const UserInfo: FC<UserInfoProps> = ({ selectedUserId }) => {
  const { fields, isLoading } = useUserInfo(selectedUserId);
  return (
    <Loader isLoading={isLoading}>
      <Info fields={fields} />
    </Loader>
  );
};
