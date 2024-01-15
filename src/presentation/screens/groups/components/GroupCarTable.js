import { useCallback, useState } from 'react';

import AppConstants from '../../../../internal/app_constants';
import { GroupCarsSortTypes, addGroupCar } from '../../../../internal/effector/groups/effects';
import { addGroupCarFormSelectors, switchGroupFormSelectors } from '../../../../internal/effector/groups/forms';
import { switchCarGroup, uploadCarsList } from '../../../../internal/effector/vehicles/effects';
import { vehiclesStore } from '../../../../internal/effector/vehicles/store';
import { useToggle } from '../../../../internal/hooks/useToggle';
import EditTable from '../../../shared/components/edit_table/EditTable';
import StyledTable from '../../../shared/components/edit_table/styled';
import Button, { ButtonsType } from '../../../shared/ui/button/Button';
import Popup from '../../../shared/ui/popup/Popup';
import AddCarForm from './AddCarForm';
import SwitchGroupForm from './SwitchGroupForm';
import { ADD_CAR_POPUP_TITLE, CARS_TABLE_HEADERS, getCarsRowsTemplate } from './const';

const GroupCarTable = ({ groupInfo }) => {
  const loadingCars = vehiclesStore.carsLoading.useValue();
  const [openSwitchPopup, toggleSwitchPopup] = useToggle();
  const [updateTable, toggleUpdateTable] = useToggle();
  const [selectedCarId, setSelectedCarId] = useState(null);
  const isValidForm = switchGroupFormSelectors.useIsFormValid();
  const onClickSubmit = switchGroupFormSelectors.useOnClickSubmit();
  const carSwitchLoading = vehiclesStore.carBranchSwitchLoading.useValue();

  const handleUploadCarsPromise = useCallback(
    ({ page, limit, sortBy, order, query }) => {
      return uploadCarsList({
        groupId: groupInfo?.id ?? 0,
        page,
        limit,
        sortBy,
        order,
        query,
      });
    },
    [groupInfo],
  );

  const handleOpenSwitchPopup = (e, id) => {
    setSelectedCarId(id);
    toggleSwitchPopup();
  };

  const handleCloseSwitchPopup = () => {
    toggleSwitchPopup();
    setSelectedCarId(null);
  };

  const handleSwitchBranch = (data) => {
    switchCarGroup({
      id: selectedCarId,
      groupId: data.group?.id,
    })
      .then(() => {
        handleCloseSwitchPopup();
        toggleUpdateTable();
      })
      .catch((err) => {
        console.log('handleSwitchBranch GroupCarTable error', err?.response);
      });
  };

  const onClickSwitch = () => {
    if (!isValidForm) return;

    onClickSubmit();
  };

  const transferButton = (
    <StyledTable.TableButton onClick={handleOpenSwitchPopup}>
      <StyledTable.ShiftIcon />
    </StyledTable.TableButton>
  );

  return (
    <>
      <EditTable
        loading={loadingCars}
        headers={CARS_TABLE_HEADERS}
        getRowsTemplate={getCarsRowsTemplate}
        initOrderType={AppConstants.OrderTypes.asc}
        initOrderBy={GroupCarsSortTypes.byMake}
        withDate={false}
        uploadListPromise={handleUploadCarsPromise}
        addItemPromise={(data) => addGroupCar({ data, groupId: groupInfo?.id ?? 0 })}
        addFormSelectors={addGroupCarFormSelectors}
        addPopupParams={{
          title: ADD_CAR_POPUP_TITLE,
          Body: AddCarForm,
          additionalBodyProps: {
            groupId: groupInfo?.id,
          },
        }}
        withoutAction={true}
        additionalActions={[transferButton]}
        updateTable={updateTable}
      />

      <Popup
        isOpen={openSwitchPopup}
        toggleModal={toggleSwitchPopup}
        headerTitle={'Перемещение ТС'}
        closeonClickSpace={false}
        body={<SwitchGroupForm groupInfo={groupInfo} onValidSubmit={handleSwitchBranch} loading={carSwitchLoading} />}
        buttons={[
          <Button key={'action_1'} type={ButtonsType.action} onClick={onClickSwitch}>
            Переместить
          </Button>,
          <Button key={'action_2'} type={ButtonsType.action} onClick={handleCloseSwitchPopup}>
            {AppConstants.cancelTxt}
          </Button>,
        ]}
      />
    </>
  );
};

export default GroupCarTable;
