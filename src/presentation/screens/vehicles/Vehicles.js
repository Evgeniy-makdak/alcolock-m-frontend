import {
  addCar,
  CarsSortTypes, changeCar, clearVehiclesRequests,
  deleteCar,
  uploadCarsList
} from "../../../internal/effector/vehicles/effects";
import EditTable from "../../shared/components/edit_table/EditTable";
import {addCarFormSelectors, editCarFormSelectors} from "../../../internal/effector/vehicles/forms";
import VehiclesForm from "./components/VehiclesForm";
import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE, EDIT_POPUP_TITLE,
  getDeletePopupBody,
  getRowsTemplate,
  HEADERS,
} from "./const";
import AppConstants from "../../../internal/app_constants";
import {useEffect, useState} from "react";
import {useToggle} from "../../../internal/hooks/useToggle";
import Aside from "../../shared/components/aside/Aside";
import RowTableInfo from "../../shared/components/row_table_info/RowTableInfo";
import VehiclesInfo from "./components/VehiclesInfo";
import EventsHistory, {HistoryTypes} from "../../shared/components/events_history/EventsHistory";
import {vehiclesStore} from "../../../internal/effector/vehicles/store";
import {selectedBranchStore} from "../../../internal/effector/selected_branch/store";
import {userStore} from "../../../internal/effector/user/store";
import {UserPermissionsTypes} from "../../../internal/effector/user/effects";

const Vehicles = () => {
  const [selectedCarId, setSelectedCarId] = useState(null)
  const [updateInfo, toggleUpdateInfo] = useToggle()
  const loading = vehiclesStore.carsLoading.useValue()
  const selectedBranch = selectedBranchStore.selectedBranch.useValue()
  const userData = userStore.userData.useValue()

  useEffect(() => {
    return () => {
      clearVehiclesRequests()
    }
  }, [])

  useEffect(() => {
    handleCloseAside()
  }, [selectedBranch])

  const onClickRow = (id) => setSelectedCarId(id)
  const handleCloseAside = () => setSelectedCarId(null)

  const afterDelete = (id) => {
    if (id === selectedCarId) {
      handleCloseAside()
    }
  }

  const afterEdit = (id) => {
    if (id === selectedCarId) {
      toggleUpdateInfo()
    }
  }

  return (
    <>
      <div className={'page vehicles'}>
        <EditTable
          loading={loading}
          headers={HEADERS}
          getRowsTemplate={getRowsTemplate}
          initOrderType={AppConstants.OrderTypes.asc}
          initOrderBy={CarsSortTypes.byMake}
          addFormSelectors={addCarFormSelectors}
          editFormSelectors={editCarFormSelectors}
          uploadListPromise={uploadCarsList}
          deleteItemPromise={userData?.permissions.cars === UserPermissionsTypes.create
            ? deleteCar
            : null}
          addItemPromise={userData?.permissions.cars === UserPermissionsTypes.create
            ? addCar
            : null}
          editItemPromise={userData?.permissions.cars === UserPermissionsTypes.create
            ? changeCar
            : null}
          deletePopupParams={{
            title: DELETE_POPUP_TITLE,
            getBody: getDeletePopupBody
          }}
          addPopupParams={{
            title: ADD_POPUP_TITLE,
            Body: VehiclesForm,
          }}
          editPopupParams={{
            title: EDIT_POPUP_TITLE,
            Body: VehiclesForm
          }}
          selectedRow={selectedCarId}
          afterDelete={afterDelete}
          afterEdit={afterEdit}
          onRowClick={onClickRow}
          updateTable={selectedBranch}
        />
      </div>

      {selectedCarId &&
        <Aside onClose={handleCloseAside}>
          <RowTableInfo
            infoContent={<VehiclesInfo
              updateData={updateInfo}
              selectedCarId={selectedCarId}
            />}
            historyContent={<EventsHistory
              type={HistoryTypes.byCar}
              id={selectedCarId}
            />}
          />
        </Aside>
      }
    </>
  )
}

export default Vehicles
