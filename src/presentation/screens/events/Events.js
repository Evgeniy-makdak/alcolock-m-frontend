import { useEffect, useMemo, useState } from 'react';

import AppConstants from '../../../internal/app_constants';
import { EventsSortTypes, uploadEvents } from '../../../internal/effector/events/effects';
import { filtersFormSelectors } from '../../../internal/effector/events/forms';
import { eventsStore } from '../../../internal/effector/events/store';
import { selectedBranchStore } from '../../../internal/effector/selected_branch/store';
import Aside from '../../shared/components/aside/Aside';
import EditTable from '../../shared/components/edit_table/EditTable';
import EventInfo from './components/EventInfo';
import EventsFilterPanel from './components/EventsFilterPanel';
import { HEADERS, getRowsTemplate } from './const';

const Events = () => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const resetFilters = filtersFormSelectors.useResetForm();
  const filtersData = filtersFormSelectors.useFormData();
  const loading = eventsStore.eventsLoading.useValue();
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();

  useEffect(() => {
    handleCloseAside();
    return () => {
      resetFilters();
    };
  }, [selectedBranch]);

  const handleClickRow = (id) => {
    setSelectedEventId(id);
  };

  const handleCloseAside = () => setSelectedEventId(null);

  const isFiltersActive = useMemo(() => {
    return !!(
      filtersData.users.length ||
      filtersData.carsByMake.length ||
      filtersData.carsByLicense.length ||
      filtersData.eventsByType.length
    );
  }, [filtersData]);

  return (
    <>
      <div className={'page events'}>
        <EditTable
          loading={loading}
          headers={HEADERS}
          getRowsTemplate={getRowsTemplate}
          initOrderType={AppConstants.OrderTypes.desc}
          initOrderBy={EventsSortTypes.byDate}
          uploadListPromise={uploadEvents}
          onRowClick={handleClickRow}
          selectedRow={selectedEventId}
          filtersPanel={<EventsFilterPanel />}
          filtersData={filtersData}
          isFiltersActive={isFiltersActive}
          withoutAction={true}
          withoutAdd={true}
          updateTable={selectedBranch}
        />
      </div>

      {selectedEventId && (
        <Aside onClose={handleCloseAside}>
          <EventInfo selectedEventId={selectedEventId} />
        </Aside>
      )}
    </>
  );
};

export default Events;
