import { useCallback, useState } from 'react';

import { AppConstants } from '@app';
import { AddCarForm } from '@entities/groups_add_card_form';
import { EditTable } from '@features/edit_table';
import { SwitchGroupForm } from '@features/groups_switch_group_form';
import { GroupCarsSortTypes, addGroupCar } from '@pages/groups/model/effects';
import { addGroupCarFormSelectors, switchGroupFormSelectors } from '@pages/groups/model/forms';
import { switchCarGroup, uploadCarsList } from '@pages/vehicles/model/effects';
import { vehiclesStore } from '@pages/vehicles/model/store';
import { useToggle } from '@shared/hooks/useToggle';
import { StyledTable } from '@shared/styled_components/styledTable';
import { Button, ButtonsType } from '@shared/ui/button';
import { Popup } from '@shared/ui/popup';

import { ADD_CAR_POPUP_TITLE, CARS_TABLE_HEADERS } from '../../lib/const';
import { getCarsRowsTemplate } from '../../lib/helpers';

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
        body={
          <SwitchGroupForm
            groupInfo={groupInfo}
            onValidSubmit={handleSwitchBranch}
            loading={carSwitchLoading}
          />
        }
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
