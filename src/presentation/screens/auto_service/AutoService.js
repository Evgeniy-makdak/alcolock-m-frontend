import EditTable from "../../shared/components/edit_table/EditTable";
import {getRowsTemplate, HEADERS} from "./const";
import {AutoServiceSortTypes, uploadAutoServiceList} from "../../../internal/effector/auto_service/effects";
import AppConstants from "../../../internal/app_constants";
import {autoServiceStore} from "../../../internal/effector/auto_service/store";
import {useState} from "react";
import Aside from "../../shared/components/aside/Aside";
import RowTableInfo from "../../shared/components/row_table_info/RowTableInfo";
import EventsHistory, {HistoryTypes} from "../../shared/components/events_history/EventsHistory";
import AutoServiceInfo from "./components/AutoServiceInfo";

const AutoService = () => {
  const updateTable = autoServiceStore.updateTable.useValue()
  const [selectedItemId, setSelectedItemId] = useState(null)

  const onClickRow = (id) => setSelectedItemId(id)
  const handleCloseAside = () => setSelectedItemId(null)

  return (
    <>
      <div className={'page auto-service'}>
        <EditTable
          headers={HEADERS}
          getRowsTemplate={getRowsTemplate}
          initOrderType={AppConstants.OrderTypes.asc}
          initOrderBy={AutoServiceSortTypes.byDate}
          uploadListPromise={uploadAutoServiceList}
          withoutAction={true}
          withoutAdd={true}
          updateTable={updateTable}
          selectedRow={selectedItemId}
          onRowClick={onClickRow}
        />
      </div>

      {selectedItemId &&
        <Aside onClose={handleCloseAside}>
          <RowTableInfo
            historyContent={<EventsHistory
              type={HistoryTypes.byAlcolock}
              id={selectedItemId}
            />}
            infoContent={<AutoServiceInfo
              selectedId={selectedItemId}
            />}
          />
        </Aside>
      }
    </>
  )
}

export default AutoService
