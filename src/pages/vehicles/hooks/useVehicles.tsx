import { useEffect, useState } from 'react';

import { EventsHistory, HistoryTypes } from '@features/events_history';
import { userStore } from '@features/menu_button/model/store';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import { VehiclesInfo } from '@widgets/vehicles_info';

import { clearVehiclesRequests } from '../model/effects';
import { vehiclesStore } from '../model/store';

export const useVehicles = () => {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const loading = vehiclesStore.carsLoading.useValue();
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();
  const userData = userStore.userData.useValue();

  useEffect(() => {
    return () => {
      clearVehiclesRequests();
    };
  }, []);

  useEffect(() => {
    handleCloseAside();
  }, [selectedBranch]);

  const onClickRow = (id: string) => setSelectedCarId(id);
  const handleCloseAside = () => setSelectedCarId(null);

  const afterDelete = (id: string) => {
    if (id === selectedCarId) {
      handleCloseAside();
    }
  };

  const afterEdit = (id: string) => {
    if (id === selectedCarId) {
      typeof toggleUpdateInfo === 'function' && toggleUpdateInfo();
    }
  };
  const tabs = [
    {
      name: 'ИНФО',
      content: <VehiclesInfo updateData={updateInfo} selectedCarId={selectedCarId} />,
    },
    {
      name: 'ИСТОРИЯ',
      content: <EventsHistory type={HistoryTypes.byCar} id={selectedCarId} />,
    },
  ];
  return {
    loading,
    userData,
    onClickRow,
    afterDelete,
    afterEdit,
    tabs,
    selectedCarId,
    handleCloseAside,
    selectedBranch,
  };
};
