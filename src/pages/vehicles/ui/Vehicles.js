import { useEffect, useState } from 'react';

import AppConstants from '@app/lib/app_constants';
import RowTableInfo from '@entities/row_table_info/ui/RowTableInfo';
import VehiclesForm from '@entities/vehicles/ui/VehiclesForm';
import EditTable from '@features/edit_table/ui/EditTable';
import EventsHistory, { HistoryTypes } from '@features/events_history/ui/EventsHistory';
import { UserPermissionsTypes } from '@features/menu_button/model/effects';
import { userStore } from '@features/menu_button/model/store';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import Aside from '@shared/ui/aside/Aside';
import VehiclesInfo from '@widgets/vehicles/ui/VehiclesInfo';

import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  HEADERS,
  getDeletePopupBody,
  getRowsTemplate,
} from '../lib/const';
import {
  CarsSortTypes,
  addCar,
  changeCar,
  clearVehiclesRequests,
  deleteCar,
  uploadCarsList,
} from '../model/effects';
import { addCarFormSelectors, editCarFormSelectors } from '../model/forms';
import { vehiclesStore } from '../model/store';

const Vehicles = () => {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const loading = vehiclesStore.carsLoading.useValue();
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();
  const userData = userStore.userData.useValue();

  useEffect(() => {
    return () => {
      clearVehiclesRequests();
    };
  }, []);

  useEffect(() => {
    handleCloseAside();
  }, [selectedBranch]);

  const onClickRow = (id) => setSelectedCarId(id);
  const handleCloseAside = () => setSelectedCarId(null);

  const afterDelete = (id) => {
    if (id === selectedCarId) {
      handleCloseAside();
    }
  };

  const afterEdit = (id) => {
    if (id === selectedCarId) {
      toggleUpdateInfo();
    }
  };

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
          deleteItemPromise={
            userData?.permissions.cars === UserPermissionsTypes.create ? deleteCar : null
          }
          addItemPromise={
            userData?.permissions.cars === UserPermissionsTypes.create ? addCar : null
          }
          editItemPromise={
            userData?.permissions.cars === UserPermissionsTypes.create ? changeCar : null
          }
          deletePopupParams={{
            title: DELETE_POPUP_TITLE,
            getBody: getDeletePopupBody,
          }}
          addPopupParams={{
            title: ADD_POPUP_TITLE,
            Body: VehiclesForm,
          }}
          editPopupParams={{
            title: EDIT_POPUP_TITLE,
            Body: VehiclesForm,
          }}
          selectedRow={selectedCarId}
          afterDelete={afterDelete}
          afterEdit={afterEdit}
          onRowClick={onClickRow}
          updateTable={selectedBranch}
        />
      </div>

      {selectedCarId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo
            infoContent={<VehiclesInfo updateData={updateInfo} selectedCarId={selectedCarId} />}
            historyContent={<EventsHistory type={HistoryTypes.byCar} id={selectedCarId} />}
          />
        </Aside>
      )}
    </>
  );
};

export default Vehicles;
