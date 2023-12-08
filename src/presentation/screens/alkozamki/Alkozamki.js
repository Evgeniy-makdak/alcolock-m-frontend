import EditTable from "../../shared/components/edit_table/EditTable";
import {
  addItem, AlcolocksSortTypes,
  changeItem,
  deleteItem,
  uploadAlkozamkiList
} from "../../../internal/effector/alkozamki/effects";
import AppConstants from "../../../internal/app_constants";
import {addAlkozamokFormSelectors, editAlkozamokFormSelectors} from "../../../internal/effector/alkozamki/forms";
import AlkozamkiForm from "./components/AlkozamkiForm";
import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  getDeletePopupBody,
  getRowsTemplate,
  HEADERS,
} from "./const";
import {useState} from "react";
import {useToggle} from "../../../internal/hooks/useToggle";
import Aside from "../../shared/components/aside/Aside";
import RowTableInfo from "../../shared/components/row_table_info/RowTableInfo";
import AlkozamkiInfo from "./components/AlkozamkiInfo";
import EventsHistory, {HistoryTypes} from "../../shared/components/events_history/EventsHistory";
import {alkozamkiStore} from "../../../internal/effector/alkozamki/store";
import {selectedBranchStore} from "../../../internal/effector/selected_branch/store";
import {userStore} from "../../../internal/effector/user/store";
import {UserPermissionsTypes} from "../../../internal/effector/user/effects";

const Alkozamki = () => {
  const [selectedAlcolockId, setSelectedAlcolockId] = useState(null)
  const [updateInfo, toggleUpdateInfo] = useToggle()
  const [updateTable, toggleUpdateTable] = useToggle()
  const loading = alkozamkiStore.alkozamkiLoading.useValue()
  const selectedBranch = selectedBranchStore.selectedBranch.useValue()
  const userData = userStore.userData.useValue()

  const onClickRow = (id) => setSelectedAlcolockId(id)
  const handleCloseAside = () => setSelectedAlcolockId(null)

  const afterDelete = (id) => {
    if (id === selectedAlcolockId) {
      handleCloseAside()
    }
  }

  const afterEdit = (id) => {
    if (id === selectedAlcolockId) {
      toggleUpdateInfo()
    }
  }

  return (
    <>
      <div className={'page alkozamki'}>
        <EditTable
          loading={loading}
          headers={HEADERS}
          getRowsTemplate={getRowsTemplate}
          initOrderType={AppConstants.OrderTypes.asc}
          initOrderBy={AlcolocksSortTypes.byMode}
          addFormSelectors={addAlkozamokFormSelectors}
          editFormSelectors={editAlkozamokFormSelectors}
          uploadListPromise={uploadAlkozamkiList}
          deleteItemPromise={userData?.permissions.alcolocks === UserPermissionsTypes.create
            ? deleteItem
            : null}
          addItemPromise={userData?.permissions.alcolocks === UserPermissionsTypes.create
            ? addItem
            : null}
          editItemPromise={userData.permissions.alcolocks === UserPermissionsTypes.create
            ? changeItem
            : null}
          deletePopupParams={{
            title: DELETE_POPUP_TITLE,
            getBody: getDeletePopupBody
          }}
          addPopupParams={{
            title: ADD_POPUP_TITLE,
            Body: AlkozamkiForm
          }}
          editPopupParams={{
            title: EDIT_POPUP_TITLE,
            Body: AlkozamkiForm
          }}
          selectedRow={selectedAlcolockId}
          afterDelete={afterDelete}
          afterEdit={afterEdit}
          onRowClick={onClickRow}
          updateTable={[updateTable, selectedBranch]}
        />
      </div>

      {selectedAlcolockId &&
        <Aside onClose={handleCloseAside}>
          <RowTableInfo
            infoContent={<AlkozamkiInfo
              updateData={updateInfo}
              toggleUpdateInfo={toggleUpdateInfo}
              selectedAlcolockId={selectedAlcolockId}
              toggleUpdateTable={toggleUpdateTable}
            />}
            historyContent={<EventsHistory
              type={HistoryTypes.byAlcolock}
              id={selectedAlcolockId}
            />}
          />
        </Aside>
      }
    </>
  )
}

export default Alkozamki
