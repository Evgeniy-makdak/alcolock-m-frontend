import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import StyledTable from "../edit_table/styled";
import {useEffect, useState} from "react";
import {getEventsHistory} from "../../../../internal/effector/events/effects";
import AppConstants from "../../../../internal/app_constants";
import Formatters from "../../../../internal/utils/formatters";
import EventData from "./components/EventData";
import Loader from "../loader/Loader";

export const HistoryTypes = {
  byUser: 'byUser',
  byCar: 'byCar',
  byAlcolock: 'byAlcolock'
}

const EventsHistory = ({type, id}) => {
  const [eventsList, setEventsList] = useState([])
  const [expandRowId, setExpandRowId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setExpandRowId(null)
    setLoading(true)
    switch (type) {
      case HistoryTypes.byUser:
        getEventsHistory({
          userId: id
        })
          .then(res => {
            setLoading(false)
            setEventsList(res)
          })
          .catch(err => {
            setLoading(false)
            console.log('HistoryTypes.byUser err', err?.response ?? err)
          })
        break
      case HistoryTypes.byCar:
        getEventsHistory({
          carId: id
        })
          .then(res => {
            setEventsList(res)
            setLoading(false)
          })
          .catch(err => {
            setLoading(false)
            console.log('HistoryTypes.byCar err', err?.response ?? err)
          })
        break
      case HistoryTypes.byAlcolock:
        getEventsHistory({
          alcolockId: id
        })
          .then(res => {
            setEventsList(res)
            setLoading(false)
          })
          .catch(err => {
            setLoading(false)
            console.log('HistoryTypes.byAlcolock err', err?.response ?? err)
          })
        break
    }
  }, [id, type])

  const onClickExpand = (id) => {
    if (expandRowId === id) {
      setExpandRowId(null)
    } else {
      setExpandRowId(id)
    }
  }

  const rows = eventsList.map((event) => {
    return (
      <>
        <StyledTable.BodyRow
          key={event.id}
        >
          <StyledTable.BodyCell>
            {AppConstants.eventTypesList.find(item => item.value === event.type)?.label ?? '-'}
          </StyledTable.BodyCell>

          <StyledTable.BodyCell
            sx={{
              textAlign: 'right',
              width: '193px'
            }}
          >
            {Formatters.formatISODate(event.createdAt)}
          </StyledTable.BodyCell>

          <StyledTable.BodyCell sx={{ maxWidth: '48px', width: '48px'}}>
            <div
              style={{
                display: "flex",
                justifyContent: 'center',
                maxWidth: '48px'
              }}
            >
              <StyledTable.TableButton
                onClick={() => onClickExpand(event.id)}
              >
                {expandRowId === event.id
                  ? <StyledTable.CollapseIcon
                    className={'icon-button'}
                  />
                  : <StyledTable.ExpandIcon
                    className={'icon-button'}
                  />
                }
              </StyledTable.TableButton>
            </div>
          </StyledTable.BodyCell>
        </StyledTable.BodyRow>

        {expandRowId === event.id &&
          <TableRow
            key={event.id + '-info'}
          >
            <StyledTable.DataCell colSpan={3}>
              <EventData
                type={type}
                event={event}
              />
            </StyledTable.DataCell>
          </TableRow>
        }
      </>
    )
  })

  return (
    <Loader
      isLoading={loading}
      styles={{
        wrapper: (base) => ({
          ...base,
          overflow: 'auto',
          flexGrow: 1
        })
      }}
    >
      <div className={'events-history'}>
        <Table
          stickyHeader
        >
          <TableHead
            sx={{
              borderTop: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            <StyledTable.HeaderRow>
              <StyledTable.HeaderCell>
                Тип события
              </StyledTable.HeaderCell>

              <StyledTable.HeaderCell
                sx={{
                  textAlign: 'right'
                }}
              >
                Дата
              </StyledTable.HeaderCell>

              <StyledTable.HeaderCell sx={{ maxWidth: '48px', width: '48px'}}/>
            </StyledTable.HeaderRow>
          </TableHead>

          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </div>
    </Loader>
  )
}

export default EventsHistory
