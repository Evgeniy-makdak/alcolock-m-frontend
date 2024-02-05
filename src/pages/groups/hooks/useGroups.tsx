import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutePaths } from '@app/index';
import { userStore } from '@features/menu_button/model/store';
import { testids } from '@shared/const/testid';
import { useToggle } from '@shared/hooks/useToggle';
import { GroupAlcolocksTable } from '@widgets/group_alcolocks_table';
import { GroupCarTable } from '@widgets/group_card_table';
import { GroupUsersTable } from '@widgets/group_users_table';

import { getGroup } from '../model/effects';
import { groupsStore } from '../model/store';

export const useGroups = () => {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const loading = groupsStore.listLoading.useValue();
  const navigate = useNavigate();
  const userData = userStore.userData.useValue();
  const [groupInfo, setGroupInfo] = useState(null);
  const loadingGroupData = groupsStore.groupLoading.useValue();

  useEffect(() => {
    if (!selectedGroupId) return;

    getGroup(selectedGroupId).then((res) => {
      if (res) {
        setGroupInfo(res);
      }
    });
  }, [selectedGroupId, updateInfo]);

  useEffect(() => {
    if (!userData?.isAdmin) {
      navigate(RoutePaths.events);
    }
  }, [userData]);

  const onClickRow = (id: string) => setSelectedGroupId(id);
  const handleCloseAside = () => setSelectedGroupId(null);

  const afterDelete = (id: string) => {
    if (id === selectedGroupId) {
      handleCloseAside();
    }
  };

  const afterEdit = (id: string) => {
    if (id === selectedGroupId) {
      toggleUpdateInfo();
    }
  };
  const onCloseAside = () => {
    setSelectedGroupId(null);
  };
  const tabs = [
    {
      testid: testids.page_groups.groups_widget_info.GROUPS_WIDGET_INFO_TAB_USERS_BUTTON,
      name: 'Пользователи',
      content: <GroupUsersTable groupInfo={groupInfo} />,
    },
    {
      testid: testids.page_groups.groups_widget_info.GROUPS_WIDGET_INFO_TAB_ALCOLOCKS_BUTTON,
      name: 'Алкозамки',
      content: <GroupAlcolocksTable groupInfo={groupInfo} />,
    },
    {
      testid: testids.page_groups.groups_widget_info.USERS_WIDGET_INFO_TAB_TRANSPORT_BUTTON,
      name: 'Транспорт',
      content: <GroupCarTable groupInfo={groupInfo} />,
    },
  ];
  return {
    groupName: groupInfo?.name ?? '-',
    selectedGroupId,
    loading: loading || loadingGroupData,
    onClickRow,
    afterDelete,
    afterEdit,
    onCloseAside,
    tabs,
  };
};
