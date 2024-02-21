import { useEffect, useState } from 'react';

import { EventsHistory, HistoryTypes } from '@features/events_history';
import { userStore } from '@features/menu_button/model/store';
import { testids } from '@shared/const/testid';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import { AlkozamkiInfo } from '@widgets/alkozamki_info';

import { alkozamkiStore } from '../model/store';

export const useAlkozamki = () => {
  const [selectedAlcolockId, setSelectedAlcolockId] = useState(null);
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const [updateTable, toggleUpdateTable] = useToggle();
  const loading = alkozamkiStore.alkozamkiLoading.useValue();
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();

  const userData = userStore.userData.useValue();

  const onClickRow = (id: string) => setSelectedAlcolockId(id);
  const handleCloseAside = () => setSelectedAlcolockId(null);

  const afterDelete = (id: string) => {
    if (id === selectedAlcolockId) {
      handleCloseAside();
    }
  };

  const afterEdit = (id: string) => {
    if (id === selectedAlcolockId) {
      toggleUpdateInfo();
    }
  };

  // TODO => нужно ли это ?
  useEffect(() => {
    setInterval(() => {
      toggleUpdateTable();
      toggleUpdateInfo();
    }, 60000);
  }, []);

  const tabs = [
    {
      testid: testids.page_alcolocks.alcolocks_widget_info.ALCOLOCKS_WIDGET_INFO_TAB_BUTTON_INFO,
      name: 'ИНФО',
      content: <AlkozamkiInfo updateData={updateInfo} selectedAlcolockId={selectedAlcolockId} />,
    },
    {
      testid: testids.page_alcolocks.alcolocks_widget_info.ALCOLOCKS_WIDGET_INFO_TAB_BUTTON_HISTORY,
      name: 'ИСТОРИЯ',
      content: <EventsHistory type={HistoryTypes.byAlcolock} id={selectedAlcolockId} />,
    },
  ];

  return {
    loading,
    selectedBranch,
    userData,
    tabs,
    updateTable,
    selectedAlcolockId,
    onClickRow,
    afterDelete,
    afterEdit,
    handleCloseAside,
  };
};
