import { AppConstants } from '@app';
import { RowTableInfo } from '@entities/row_table_info';
import { VehiclesForm } from '@entities/vehicles_form';
import { EditTable } from '@features/edit_table';
import { UserPermissionsTypes } from '@features/menu_button';
import { PageWrapper } from '@layout/page_wrapper';
import { Aside } from '@shared/ui/aside';

import { useVehicles } from '../hooks/useVehicles';
import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  HEADERS,
  getDeletePopupBody,
  getRowsTemplate,
} from '../lib/const';
import { CarsSortTypes, addCar, changeCar, deleteCar, uploadCarsList } from '../model/effects';
import { addCarFormSelectors, editCarFormSelectors } from '../model/forms';
import style from './Vechicles.module.scss';

const Vehicles = () => {
  const {
    handleCloseAside,
    afterDelete,
    afterEdit,
    loading,
    onClickRow,
    tabs,
    userData,
    selectedCarId,
    selectedBranch,
  } = useVehicles();

  return (
    <>
      <PageWrapper>
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
            userData?.permissions.cars === UserPermissionsTypes.CREATE ? deleteCar : null
          }
          addItemPromise={
            userData?.permissions.cars === UserPermissionsTypes.CREATE ? addCar : null
          }
          editItemPromise={
            userData?.permissions.cars === UserPermissionsTypes.CREATE ? changeCar : null
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
          marginControls={style.marginControls}
        />
      </PageWrapper>

      {selectedCarId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo key={selectedCarId} tabs={tabs} />
        </Aside>
      )}
    </>
  );
};

export default Vehicles;
