import EditTable from "../../shared/components/edit_table/EditTable";
import {getRowsTemplate, HEADERS} from "./const";
import {AutoServiceSortTypes, uploadAutoServiceList} from "../../../internal/effector/auto_service/effects";
import AppConstants from "../../../internal/app_constants";
import {autoServiceStore} from "../../../internal/effector/auto_service/store";
import {useEffect, useState} from "react";
import Aside from "../../shared/components/aside/Aside";
import RowTableInfo from "../../shared/components/row_table_info/RowTableInfo";
import EventsHistory, {HistoryTypes} from "../../shared/components/events_history/EventsHistory";
import AutoServiceInfo from "./components/AutoServiceInfo";
import {selectedBranchStore} from "../../../internal/effector/selected_branch/store";
import {useToggle} from "../../../internal/hooks/useToggle";

const AutoService = () => {
  const [updateTable, toggleUpdateTable] = useToggle()
  const [updateInfo, toggleUpdateInfo] = useToggle()
  const [selectedItemId, setSelectedItemId] = useState(null)
  const selectedBranch = selectedBranchStore.selectedBranch.useValue()
  const loading = autoServiceStore.listLoading.useValue()
  const selectedDeviceId = autoServiceStore.selectedDeviceId.useValue()
  const [updateAfterTimeout, toggleUpdateAfterTimeout] = useToggle()
  const [updateByInterval, toggleUpdateByInterval] = useToggle()

  useEffect(() => {
    toggleUpdateTable()
    toggleUpdateInfo()
  }, [updateAfterTimeout, updateByInterval])

  useEffect(() => {
    setInterval(() => {
      toggleUpdateByInterval()
    }, 60000)
  }, [])

  const onClickRow = (id) => setSelectedItemId(id)
  const handleCloseAside = () => setSelectedItemId(null)

  return (
    <>
      <div className={'page auto-service'}>
        <EditTable
          loading={loading}
          headers={HEADERS}
          getRowsTemplate={(item) => getRowsTemplate(item, toggleUpdateAfterTimeout)}
          initOrderType={AppConstants.OrderTypes.desc}
          initOrderBy={AutoServiceSortTypes.byDate}
          uploadListPromise={uploadAutoServiceList}
          withoutAction={true}
          withoutAdd={true}
          updateTable={[updateTable, selectedBranch]}
          selectedRow={selectedItemId}
          onRowClick={onClickRow}
        />
      </div>

      {selectedItemId &&
        <Aside onClose={handleCloseAside}>
          <RowTableInfo
            historyContent={<EventsHistory
              type={HistoryTypes.byAlcolock}
              id={selectedDeviceId}
            />}
            infoContent={<AutoServiceInfo
              updateData={updateInfo}
              toggleUpdateInfo={toggleUpdateInfo}
              selectedId={selectedItemId}
              toggleUpdateTable={toggleUpdateTable}
            />}
          />
        </Aside>
      }
    </>
  )
}

export default AutoService
