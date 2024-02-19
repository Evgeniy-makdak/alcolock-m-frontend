import { useState } from 'react';

export const useEventsPage = () => {
  const [selectedEventId, setSelectedEventId] = useState<null | number | string>(null);

  const handleClickRow = (id: string | number) => {
    setSelectedEventId(id);
  };

  const handleCloseAside = () => setSelectedEventId(null);
  return { selectedEventId, handleCloseAside, handleClickRow };
};
