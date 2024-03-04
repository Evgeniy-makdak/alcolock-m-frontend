import { Table, TableBody, TableHead } from '@mui/material';

import type { HistoryTypes } from '@entities/events_data';
import type { EventsOptions } from '@shared/api/baseQuerys';
import { StyledTable } from '@shared/styled_components/styledTable';
import { Loader } from '@shared/ui/loader';

import { useEventsHistory } from '../hooks/useEventsHistory';
import style from './EventsHistory.module.scss';

export type EventsHistory = {
  type: HistoryTypes;
} & EventsOptions;

export const EventsHistory = (props: EventsHistory) => {
  const type = props.type;
  const { rows, isLoading } = useEventsHistory(props, type);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <Table stickyHeader>
          <TableHead className={style.tableHead}>
            <StyledTable.HeaderRow>
              <StyledTable.HeaderCell>Тип события</StyledTable.HeaderCell>

              <StyledTable.HeaderCell className={style.headerCellDate}>Дата</StyledTable.HeaderCell>

              <StyledTable.HeaderCell className={style.headerCell} />
            </StyledTable.HeaderRow>
          </TableHead>

          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    </Loader>
  );
};
