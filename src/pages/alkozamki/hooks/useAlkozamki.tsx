import { useState } from 'react';

import { EventsHistory, HistoryTypes } from '@features/events_history';
import { testids } from '@shared/const/testid';
import { AlkozamkiInfo } from '@widgets/alkozamki_info';

export const useAlkozamki = () => {
  const [selectedAlcolockId, setSelectedAlcolockId] = useState(null);
  const onClickRow = (id: string) => setSelectedAlcolockId(id);
  const handleCloseAside = () => setSelectedAlcolockId(null);

  const tabs = [
    {
      testid: testids.page_alcolocks.alcolocks_widget_info.ALCOLOCKS_WIDGET_INFO_TAB_BUTTON_INFO,
      name: 'ИНФО',
      content: <AlkozamkiInfo selectedAlcolockId={selectedAlcolockId} />,
    },
    {
      testid: testids.page_alcolocks.alcolocks_widget_info.ALCOLOCKS_WIDGET_INFO_TAB_BUTTON_HISTORY,
      name: 'ИСТОРИЯ',
      content: <EventsHistory type={HistoryTypes.byAlcolock} id={selectedAlcolockId} />,
    },
  ];

  return {
    tabs,
    selectedAlcolockId,
    onClickRow,
    handleCloseAside,
  };
};
