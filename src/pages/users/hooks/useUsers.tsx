import { useEffect, useState } from 'react';

import { EventsHistory, HistoryTypes } from '@features/events_history';
import { userStore } from '@features/menu_button/model/store';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import { UserInfo } from '@widgets/users_info';

import { usersStore } from '../model/store';

export const useUsers = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const loading = usersStore.usersLoading.useValue();
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();
  const userData = userStore.userData.useValue();

  useEffect(() => {
    handleCloseAside();
  }, [selectedBranch]);

  const onClickRow = (id: string) => setSelectedUserId(id);
  const handleCloseAside = () => setSelectedUserId(null);

  const afterDelete = (id: string) => {
    if (id === selectedUserId) {
      handleCloseAside();
    }
  };

  const afterEdit = (id: string) => {
    if (id === selectedUserId) {
      toggleUpdateInfo();
    }
  };
  const tabs = [
    {
      name: 'ИНФО',
      content: <UserInfo selectedUserId={selectedUserId} updateData={updateInfo} />,
    },
    {
      name: 'ИСТОРИЯ',
      content: <EventsHistory type={HistoryTypes.byUser} id={selectedUserId} />,
    },
  ];
  return {
    loading,
    userData,
    tabs,
    onClickRow,
    afterDelete,
    afterEdit,
    selectedUserId,
    handleCloseAside,
    selectedBranch,
  };
};
