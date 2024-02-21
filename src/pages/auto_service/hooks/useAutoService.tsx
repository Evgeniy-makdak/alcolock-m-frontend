import { useEffect, useState } from 'react';

import { EventsHistory, HistoryTypes } from '@features/events_history';
import { AutoServiceInfo } from '@widgets/auto_service_info';

export const useAutoService = () => {
  // const [updateTable, toggleUpdateTable] = useToggle();
  // const [updateInfo, toggleUpdateInfo] = useToggle();
  const [selectedItemId, setSelectedItemId] = useState(null);
  // const selectedBranch = selectedBranchStore.selectedBranch.useValue();
  // const loading = autoServiceStore.listLoading.useValue();
  // const selectedDeviceId = autoServiceStore.selectedDeviceId.useValue();
  // const [updateAfterTimeout, toggleUpdateAfterTimeout] = useToggle();
  // const [updateByInterval, toggleUpdateByInterval] = useToggle();
  // useEffect(() => {
  //   toggleUpdateTable();
  //   toggleUpdateInfo();
  // }, [updateAfterTimeout, updateByInterval]);

  useEffect(() => {
    setInterval(() => {
      // toggleUpdateByInterval();
    }, 60000);
  }, []);

  const onClickRow = (id: string | number, deviceId: string | number) =>
    setSelectedItemId({ id, deviceId });
  const handleCloseAside = () => setSelectedItemId(null);

  const tabs = [
    {
      name: 'ИНФО',
      content: (
        <AutoServiceInfo
          // updateData={updateInfo}
          // toggleUpdateInfo={toggleUpdateInfo}
          selectedId={selectedItemId?.id}
          // toggleUpdateTable={toggleUpdateTable}
        />
      ),
    },
    {
      name: 'ИСТОРИЯ',
      content: <EventsHistory type={HistoryTypes.byAlcolock} id={selectedItemId?.deviceId} />,
    },
  ];
  return {
    // selectedBranch,
    selectedItemId,
    // updateTable,
    tabs,
    onClickRow,
    // toggleUpdateAfterTimeout,
    handleCloseAside,
  };
};
