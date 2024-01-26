import { useEffect, useState } from 'react';

import { EventsHistory, HistoryTypes } from '@features/events_history';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import { AutoServiceInfo } from '@widgets/auto_service_info';

import { autoServiceStore } from '../model/store';

export const useAutoService = () => {
  const [updateTable, toggleUpdateTable] = useToggle();
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();
  const loading = autoServiceStore.listLoading.useValue();
  const selectedDeviceId = autoServiceStore.selectedDeviceId.useValue();
  const [updateAfterTimeout, toggleUpdateAfterTimeout] = useToggle();
  const [updateByInterval, toggleUpdateByInterval] = useToggle();

  useEffect(() => {
    toggleUpdateTable();
    toggleUpdateInfo();
  }, [updateAfterTimeout, updateByInterval]);

  useEffect(() => {
    setInterval(() => {
      toggleUpdateByInterval();
    }, 60000);
  }, []);

  const onClickRow = (id: string) => setSelectedItemId(id);
  const handleCloseAside = () => setSelectedItemId(null);

  const tabs = [
    {
      name: 'ИНФО',
      content: (
        <AutoServiceInfo
          updateData={updateInfo}
          toggleUpdateInfo={toggleUpdateInfo}
          selectedId={selectedItemId}
          toggleUpdateTable={toggleUpdateTable}
        />
      ),
    },
    {
      name: 'ИСТОРИЯ',
      content: <EventsHistory type={HistoryTypes.byAlcolock} id={selectedDeviceId} />,
    },
  ];
  return {
    selectedBranch,
    selectedItemId,
    updateTable,
    loading,
    tabs,
    onClickRow,
    toggleUpdateAfterTimeout,
    handleCloseAside,
  };
};
