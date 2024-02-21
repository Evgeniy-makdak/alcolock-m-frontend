/* eslint-disable @typescript-eslint/no-unused-vars */
import { RowTableInfo } from '@entities/row_table_info';
import { PageWrapper } from '@layout/page_wrapper';
import { Aside } from '@shared/ui/aside';
import { EventInfo } from '@widgets/events_info';
import { EventsTable } from '@widgets/events_table';

import { useEventsPage } from '../hooks/useEventsPage';

const Events = () => {
  const { handleClickRow, handleCloseAside, selectedEventId } = useEventsPage();

  return (
    <>
      <PageWrapper>
        <EventsTable handleClickRow={handleClickRow} />
      </PageWrapper>

      {selectedEventId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo
            tabs={[
              {
                name: 'Инфо',
                content: <EventInfo selectedEventId={selectedEventId} />,
              },
            ]}
          />
        </Aside>
      )}
    </>
  );
};

export default Events;
