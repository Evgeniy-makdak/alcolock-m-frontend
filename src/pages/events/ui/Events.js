import { useEffect, useMemo, useState } from 'react';

import { AppConstants } from '@app';
import { EventsFilterPanel } from '@entities/events_filter_panel';
import { EditTable } from '@features/edit_table';
import { PageWrapper } from '@layout/page_wrapper';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import { Aside } from '@shared/ui/aside';
import { EventInfo } from '@widgets/events_info';

import { HEADERS, getRowsTemplate } from '../lib/const';
import { EventsSortTypes, uploadEvents } from '../model/effects';
import { filtersFormSelectors } from '../model/forms';
import { eventsStore } from '../model/store';

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
      <PageWrapper>
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
      </PageWrapper>

      {selectedEventId && (
        <Aside onClose={handleCloseAside}>
          <EventInfo selectedEventId={selectedEventId} />
        </Aside>
      )}
    </>
  );
};

export default Events;
