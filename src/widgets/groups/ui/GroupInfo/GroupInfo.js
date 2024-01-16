import { useEffect, useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getGroup } from '@pages/groups/model/effects';
import { groupsStore } from '@pages/groups/model/store';
import Loader from '@shared/ui/loader/Loader';

import GroupAlcolocksTable from '../GroupAlcolocksTable/GroupAlcolocksTable';
import GroupCarTable from '../GroupCarTable/GroupCarTable';
import GroupUsersTable from '../GroupUsersTable/GroupUsersTable';
import './GroupInfo.sass';

export const GroupTabs = {
  users: 'users',
  alcolocks: 'alcolocks',
  cars: 'cars',
};

const GroupInfo = ({ selectedGroupId, updateInfo, onClose }) => {
  const [activeTab, setActiveTab] = useState(GroupTabs.users);
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

  const getContent = () => {
    switch (activeTab) {
      case GroupTabs.users:
        return <GroupUsersTable groupInfo={groupInfo} />;
      case GroupTabs.alcolocks:
        return <GroupAlcolocksTable groupInfo={groupInfo} />;
      case GroupTabs.cars:
        return <GroupCarTable groupInfo={groupInfo} />;
      default:
        return null;
    }
  };

  return (
    <Loader
      isLoading={loadingGroupData}
      styles={{
        wrapper: (base) => ({
          ...base,
          display: 'flex',
          height: '100vh',
          flex: '1 1 0',
          overflow: 'hidden',
        }),
      }}>
      <div className={'page groups-info'}>
        <div className="groups-info__name">
          <span>{groupInfo?.name ?? '-'}</span>
        </div>

        <div className="groups-info__tabs">
          <button
            onClick={() => setActiveTab(GroupTabs.users)}
            className={activeTab === GroupTabs.users ? 'active' : ''}>
            Пользователи
          </button>

          <button
            onClick={() => setActiveTab(GroupTabs.alcolocks)}
            className={activeTab === GroupTabs.alcolocks ? 'active' : ''}>
            Алкозамки
          </button>

          <button
            onClick={() => setActiveTab(GroupTabs.cars)}
            className={activeTab === GroupTabs.cars ? 'active' : ''}>
            Транспорт
          </button>
        </div>

        {getContent()}

        <div className="groups-info__close" onClick={onClose}>
          <ArrowBackIosNewIcon />
        </div>
      </div>
    </Loader>
  );
};

export default GroupInfo;
