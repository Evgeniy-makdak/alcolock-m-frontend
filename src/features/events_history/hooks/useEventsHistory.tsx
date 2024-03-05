import React, { useState } from 'react';

import { TableRow } from '@mui/material';

import { EventData, type HistoryTypes } from '@entities/events_data';
import type { EventsOptions } from '@shared/api/baseQuerys';
import { testids } from '@shared/const/testid';
import { StyledTable } from '@shared/styled_components/styledTable';
import type { ID } from '@shared/types/BaseQueryTypes';

import { useEventsHistoryApi } from '../api/useEventsHistoryApi';
import { ItemButton, date, isTheSameRow, typeEvent } from '../lib/helpers';
import style from '../ui/EventsHistory.module.scss';

export const useEventsHistory = (options: EventsOptions, type: HistoryTypes) => {
  const [expandRowId, setExpandRowId] = useState(null);
  const { data, isLoading } = useEventsHistoryApi(options);

  const onClickExpand = (id: ID) => {
    if (expandRowId === id) {
      setExpandRowId(null);
    } else {
      setExpandRowId(id);
    }
  };

  const rows =
    (data || []).length > 0
      ? data?.map((event) => {
          return (
            <React.Fragment key={event?.id}>
              <StyledTable.BodyRow key={event.id} data-testid={testids.EVENT_HISTORY_TABLE_ITEM}>
                <StyledTable.BodyCell>{typeEvent(event)}</StyledTable.BodyCell>

                <StyledTable.BodyCell className={style.bodyCellCreatedAt}>
                  {date(event)}
                </StyledTable.BodyCell>

                <StyledTable.BodyCell className={style.bodyCellButtonWrapper}>
                  <div className={style.buttonWrapper}>
                    <StyledTable.TableButton onClick={() => onClickExpand(event.id)}>
                      {ItemButton(event, expandRowId)}
                    </StyledTable.TableButton>
                  </div>
                </StyledTable.BodyCell>
              </StyledTable.BodyRow>

              {isTheSameRow(event, expandRowId) && (
                <TableRow key={`${event.id}-info`}>
                  <StyledTable.DataCell colSpan={3}>
                    <EventData
                      testid={testids.EVENT_HISTORY_TABLE_MAP_LINK}
                      type={type}
                      event={event}
                    />
                  </StyledTable.DataCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })
      : null;

  return { data, isLoading, expandRowId, rows };
};
