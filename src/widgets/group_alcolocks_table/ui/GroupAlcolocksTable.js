import { useCallback, useState } from 'react';

import { AppConstants } from '@app';
import { AddAlcolockForm } from '@entities/groups_add_alcolock_form';
import { EditTable } from '@features/edit_table';
import { SwitchGroupForm } from '@features/groups_switch_group_form';
import { switchAlcolockGroup, uploadAlkozamkiList } from '@pages/alkozamki/model/effects';
import { alkozamkiStore } from '@pages/alkozamki/model/store';
import { GroupAlcolocksSortTypes, addGroupAlcolock } from '@pages/groups/model/effects';
import { addGroupAlcolockFormSelectors, switchGroupFormSelectors } from '@pages/groups/model/forms';
import { useToggle } from '@shared/hooks/useToggle';
import { StyledTable } from '@shared/styled_components/styledTable';
import { Button, ButtonsType } from '@shared/ui/button';
import { Popup } from '@shared/ui/popup';

import { ADD_ALCOLOCK_POPUP_TITLE, ALCOLOCKS_TABLE_HEADERS } from '../lib/const';
import { getAlcolocksRowsTemplate } from '../lib/helpers';
import style from './GroupAlcolocksTable.module.scss';

export const GroupAlcolocksTable = ({ groupInfo }) => {
  const [openSwitchPopup, toggleSwitchPopup] = useToggle();
  const loadingAlcolocks = alkozamkiStore.alkozamkiLoading.useValue();
  const [selectedAlcolockId, setSelectedAlcolockId] = useState(null);
  const isValidForm = switchGroupFormSelectors.useIsFormValid();
  const onClickSubmit = switchGroupFormSelectors.useOnClickSubmit();
  const [updateTable, toggleUpdateTable] = useToggle();
  const alcolockSwitchLoading = alkozamkiStore.alcolockBranchSwitchLoading.useValue();
  // const loading = groupsStore.alcolocksMoveLoading.useValue();

  const handleUploadAlcolocksPromise = useCallback(
    ({ page, limit, sortBy, order, query }) => {
      return uploadAlkozamkiList({
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
    setSelectedAlcolockId(id);
    toggleSwitchPopup();
  };

  const handleCloseSwitchPopup = () => {
    toggleSwitchPopup();
    setSelectedAlcolockId(null);
  };

  const transferButton = (
    <StyledTable.TableButton onClick={handleOpenSwitchPopup}>
      <StyledTable.ShiftIcon />
    </StyledTable.TableButton>
  );

  const onClickSwitch = () => {
    if (!isValidForm) return;

    onClickSubmit();
  };

  const handleSwitchBranch = (data) => {
    switchAlcolockGroup({
      alcolockId: selectedAlcolockId,
      groupId: data.group?.id,
    })
      .then(() => {
        handleCloseSwitchPopup();
        toggleUpdateTable();
      })
      .catch((err) => {
        console.log('handleSwitchBranch GroupAlcolocksTable error', err?.response);
      });
  };

  return (
    <>
      <EditTable
        loading={loadingAlcolocks}
        headers={ALCOLOCKS_TABLE_HEADERS}
        getRowsTemplate={getAlcolocksRowsTemplate}
        initOrderType={AppConstants.OrderTypes.asc}
        initOrderBy={GroupAlcolocksSortTypes.byName}
        withDate={false}
        uploadListPromise={handleUploadAlcolocksPromise}
        addFormSelectors={addGroupAlcolockFormSelectors}
        addItemPromise={(data) => addGroupAlcolock({ data, groupId: groupInfo?.id ?? 0 })}
        marginControls={style.marginControls}
        addPopupParams={{
          title: ADD_ALCOLOCK_POPUP_TITLE,
          // TODO => добавить проброс isLoading
          Body: AddAlcolockForm,
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
        headerTitle={'Перемещение алкозамка'}
        closeonClickSpace={false}
        body={
          <SwitchGroupForm
            groupInfo={groupInfo}
            onValidSubmit={handleSwitchBranch}
            loading={alcolockSwitchLoading}
          />
        }
        buttons={[
          <Button key={'action_1'} typeButton={ButtonsType.action} onClick={onClickSwitch}>
            Переместить
          </Button>,
          <Button key={'action_2'} typeButton={ButtonsType.action} onClick={handleCloseSwitchPopup}>
            {AppConstants.cancelTxt}
          </Button>,
        ]}
      />
    </>
  );
};
