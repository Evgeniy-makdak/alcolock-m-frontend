import { useEffect, useMemo, useState } from 'react';

import { AppConstants } from '@app';
import { EditTable } from '@features/edit_table';
import { EventsFilterPanel } from '@features/events_filter_panel';
import { PageWrapper } from '@layout/page_wrapper';
import { testids } from '@shared/const/testid';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import { Aside } from '@shared/ui/aside';
import { EventInfo } from '@widgets/events_info';

import { HEADERS, getRowsTemplate } from '../lib/const';
import { EventsSortTypes, uploadEvents } from '../model/effects';
import { filtersFormSelectors } from '../model/forms';
import { eventsStore } from '../model/store';
import style from './Events.module.scss';

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
          filtersPanel={
            <EventsFilterPanel
              testids={{
                users:
                  testids.page_events.events_widget_header.EVENTS_WIDGET_HEADER_FILTER_INPUT_DRIVER,
                carsByMake:
                  testids.page_events.events_widget_header
                    .EVENTS_WIDGET_HEADER_FILTER_INPUT_BRAND_CAR,
                carsByLicense:
                  testids.page_events.events_widget_header
                    .EVENTS_WIDGET_HEADER_FILTER_INPUT_GOS_NUMBER,
                eventsByType:
                  testids.page_events.events_widget_header
                    .EVENTS_WIDGET_HEADER_FILTER_INPUT_TYPE_EVENT,
              }}
            />
          }
          filtersData={filtersData}
          isFiltersActive={isFiltersActive}
          withoutAction={true}
          withoutAdd={true}
          updateTable={selectedBranch}
          marginControls={style.marginControls}
          tableControlTestId={{
            inputSearch: testids.page_events.events_widget_header.EVENTS_WIDGET_HEADER_SEARCH_INPUT,
            inputStart: testids.page_events.events_widget_header.EVENTS_WIDGET_HEADER_FROM_DATE,
            inputEnd: testids.page_events.events_widget_header.EVENTS_WIDGET_HEADER_TO_DATE,
            filterButton:
              testids.page_events.events_widget_header.EVENTS_WIDGET_HEADER_FILTER_BUTTON,
          }}
          testIdsForTable={{
            table: testids.page_events.events_widget_table.EVENTS_WIDGET_TABLE,
            headerItem: testids.page_events.events_widget_table.EVENTS_WIDGET_TABLE_HEADER_ITEM,
            row: testids.page_events.events_widget_table.EVENTS_WIDGET_TABLE_BODY_ITEM,
          }}
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
