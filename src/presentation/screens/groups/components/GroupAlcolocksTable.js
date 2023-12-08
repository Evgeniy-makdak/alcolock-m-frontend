import {
  ADD_ALCOLOCK_POPUP_TITLE,
  ALCOLOCKS_TABLE_HEADERS,
  getAlcolocksRowsTemplate,
} from "./const";
import AppConstants from "../../../../internal/app_constants";
import {addGroupAlcolock, GroupAlcolocksSortTypes} from "../../../../internal/effector/groups/effects";
import {addGroupAlcolockFormSelectors, switchGroupFormSelectors} from "../../../../internal/effector/groups/forms";
import AddAlcolockForm from "./AddAlcolockForm";
import EditTable from "../../../shared/components/edit_table/EditTable";
import StyledTable from "../../../shared/components/edit_table/styled";
import {alkozamkiStore} from "../../../../internal/effector/alkozamki/store";
import {useCallback, useState} from "react";
import {switchAlcolockGroup, uploadAlkozamkiList} from "../../../../internal/effector/alkozamki/effects";
import {useToggle} from "../../../../internal/hooks/useToggle";
import Popup from "../../../shared/ui/popup/Popup";
import SwitchGroupForm from "./SwitchGroupForm";
import Button, {ButtonsType} from "../../../shared/ui/button/Button";

const GroupAlcolocksTable = ({groupInfo}) => {
  const [openSwitchPopup, toggleSwitchPopup] = useToggle()
  const loadingAlcolocks = alkozamkiStore.alkozamkiLoading.useValue()
  const [selectedAlcolockId, setSelectedAlcolockId] = useState(null)
  const isValidForm = switchGroupFormSelectors.useIsFormValid()
  const onClickSubmit = switchGroupFormSelectors.useOnClickSubmit()
  const [updateTable, toggleUpdateTable] = useToggle()
  const alcolockSwitchLoading = alkozamkiStore.alcolockBranchSwitchLoading.useValue()

  const handleUploadAlcolocksPromise = useCallback((
    {
      page,
      limit,
      sortBy,
      order,
      query,
    }) => {

    return uploadAlkozamkiList({
      groupId: groupInfo?.id ?? 0,
      page,
      limit,
      sortBy,
      order,
      query,
    })
  }, [groupInfo])

  const handleOpenSwitchPopup = (e, id) => {
    setSelectedAlcolockId(id)
    toggleSwitchPopup()
  }

  const handleCloseSwitchPopup = () => {
    toggleSwitchPopup()
    setSelectedAlcolockId(null)
  }

  const transferButton = (
    <StyledTable.TableButton
      onClick={handleOpenSwitchPopup}
    >
      <StyledTable.ShiftIcon/>
    </StyledTable.TableButton>
  )

  const onClickSwitch = () => {
    if (!isValidForm) return

    onClickSubmit()
  }

  const handleSwitchBranch = (data) => {
    switchAlcolockGroup({
      alcolockId: selectedAlcolockId,
      groupId: data.group?.id
    })
      .then(() => {
        handleCloseSwitchPopup()
        toggleUpdateTable()
      })
      .catch(err => {
        console.log('handleSwitchBranch GroupAlcolocksTable error', err?.response)
      })
  }

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
        addItemPromise={(data) => addGroupAlcolock({data, groupId: groupInfo?.id ?? 0})}
        addPopupParams={{
          title: ADD_ALCOLOCK_POPUP_TITLE,
          Body: AddAlcolockForm,
          additionalBodyProps: {
            groupId: groupInfo?.id
          }
        }}
        withoutAction={true}
        additionalActions={[
          transferButton
        ]}
        updateTable={updateTable}
      />

      <Popup
        isOpen={openSwitchPopup}
        toggleModal={toggleSwitchPopup}
        headerTitle={'Перемещение алкозамка'}
        closeonClickSpace={false}
        body={<SwitchGroupForm
          groupInfo={groupInfo}
          onValidSubmit={handleSwitchBranch}
          loading={alcolockSwitchLoading}
        />}
        buttons={[
          <Button
            key={'action_1'}
            type={ButtonsType.action}
            onClick={onClickSwitch}
          >
            Переместить
          </Button>,
          <Button
            key={'action_2'}
            type={ButtonsType.action}
            onClick={handleCloseSwitchPopup}
          >
            {AppConstants.cancelTxt}
          </Button>,
        ]}
      />
    </>
  )
}

export default GroupAlcolocksTable
