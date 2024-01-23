import { useEffect, useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { getGroup } from '@pages/groups/model/effects';
import { groupsStore } from '@pages/groups/model/store';
import { Loader } from '@shared/ui/loader';

import GroupAlcolocksTable from '../GroupAlcolocksTable/GroupAlcolocksTable';
import GroupCarTable from '../GroupCarTable/GroupCarTable';
import GroupUsersTable from '../GroupUsersTable/GroupUsersTable';
import style from './GroupInfo.module.scss';

export const GroupTabs = {
  users: 'users',
  alcolocks: 'alcolocks',
  cars: 'cars',
};

export const GroupInfo = ({ selectedGroupId, updateInfo, onClose }) => {
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
  // TODO => сделать общую обертку для вкладок (табов)
  return (
    <Loader
      isLoading={loadingGroupData}
      styles={{
        wrapper: (base) => ({
          ...base,
          display: 'block',
          width: '100%',
          height: '100vh',
          flex: '1 1 0',
          overflow: 'hidden',
        }),
      }}>
      <div className={`page ${style.groupsInfo}`}>
        <div className={style.name}>
          <span>{groupInfo?.name ?? '-'}</span>
        </div>

        <div className={style.tabs}>
          <button
            // TODO => сделать общую обертку для вкладок (табов)
            onClick={() => setActiveTab(GroupTabs.users)}
            className={activeTab === GroupTabs.users ? style.active : ''}>
            Пользователи
          </button>

          <button
            onClick={() => setActiveTab(GroupTabs.alcolocks)}
            className={activeTab === GroupTabs.alcolocks ? style.active : ''}>
            Алкозамки
          </button>
          <button
            onClick={() => setActiveTab(GroupTabs.cars)}
            className={activeTab === GroupTabs.cars ? style.active : ''}>
            Транспорт
          </button>
        </div>

        {getContent()}

        <div className={style.close} onClick={onClose}>
          <ArrowBackIosNewIcon />
        </div>
      </div>
    </Loader>
  );
};
