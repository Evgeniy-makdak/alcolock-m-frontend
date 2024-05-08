import { useState } from 'react';

import { HistoryTypes } from '@entities/events_data';
import { EventsHistory } from '@features/events_history';
import { testids } from '@shared/const/testid';
import type { ID } from '@shared/types/BaseQueryTypes';
import { UserInfo } from '@widgets/users_info';

export const useUsers = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const onClickRow = (id: ID) => setSelectedUserId(id);
  const handleCloseAside = () => setSelectedUserId(null);

  const tabs = [
    {
      testid: testids.page_users.users_widget_info.USERS_WIDGET_INFO_TAB_BUTTON_INFO,
      name: 'ИНФО',
      content: <UserInfo selectedUserId={selectedUserId} />,
    },
    {
      testid: testids.page_users.users_widget_info.USERS_WIDGET_INFO_TAB_BUTTON_HISTORY,
      name: 'ИСТОРИЯ',
      content: <EventsHistory type={HistoryTypes.byUser} userId={selectedUserId} />,
    },
  ];

  return {
    tabs,
    onClickRow,
    selectedUserId,
    handleCloseAside,
  };
};
