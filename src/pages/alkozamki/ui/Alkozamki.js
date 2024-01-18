import { useState } from 'react';

import AppConstants from '@app/lib/app_constants';
import AlkozamkiForm from '@entities/alkozamki/ui/AlkozamkiForm/AlkozamkiForm';
import RowTableInfo from '@entities/row_table_info/ui/RowTableInfo';
import EditTable from '@features/edit_table/ui/EditTable';
import EventsHistory, { HistoryTypes } from '@features/events_history/ui/EventsHistory';
import { UserPermissionsTypes } from '@features/menu_button/model/effects';
import { userStore } from '@features/menu_button/model/store';
import { PageWrapper } from '@layout/page_wrapper';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import Aside from '@shared/ui/aside/Aside';
import AlkozamkiInfo from '@widgets/alkozamki/ui/AlkozamkiInfo';

import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  HEADERS,
  getDeletePopupBody,
  getRowsTemplate,
} from '../lib/const';
import {
  AlcolocksSortTypes,
  addItem,
  changeItem,
  deleteItem,
  uploadAlkozamkiList,
} from '../model/effects';
import { addAlkozamokFormSelectors, editAlkozamokFormSelectors } from '../model/forms';
import { alkozamkiStore } from '../model/store';

const Alkozamki = () => {
  const [selectedAlcolockId, setSelectedAlcolockId] = useState(null);
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const [updateTable, toggleUpdateTable] = useToggle();
  const loading = alkozamkiStore.alkozamkiLoading.useValue();
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();

  const userData = userStore.userData.useValue();

  const onClickRow = (id) => setSelectedAlcolockId(id);
  const handleCloseAside = () => setSelectedAlcolockId(null);

  const afterDelete = (id) => {
    if (id === selectedAlcolockId) {
      handleCloseAside();
    }
  };

  const afterEdit = (id) => {
    if (id === selectedAlcolockId) {
      toggleUpdateInfo();
    }
  };

  return (
    <>
      <PageWrapper>
        <EditTable
          loading={loading}
          headers={HEADERS}
          getRowsTemplate={getRowsTemplate}
          initOrderType={AppConstants.OrderTypes.asc}
          initOrderBy={AlcolocksSortTypes.byMode}
          addFormSelectors={addAlkozamokFormSelectors}
          editFormSelectors={editAlkozamokFormSelectors}
          uploadListPromise={uploadAlkozamkiList}
          deleteItemPromise={
            userData?.permissions.alcolocks === UserPermissionsTypes.create ? deleteItem : null
          }
          addItemPromise={
            userData?.permissions.alcolocks === UserPermissionsTypes.create ? addItem : null
          }
          editItemPromise={
            userData.permissions.alcolocks === UserPermissionsTypes.create ? changeItem : null
          }
          deletePopupParams={{
            title: DELETE_POPUP_TITLE,
            getBody: getDeletePopupBody,
          }}
          addPopupParams={{
            title: ADD_POPUP_TITLE,
            // TODO => тут нужно прокидывать isLoading после внедрения ts
            Body: AlkozamkiForm,
          }}
          editPopupParams={{
            title: EDIT_POPUP_TITLE,
            // TODO => тут нужно прокидывать isLoading после внедрения ts
            Body: AlkozamkiForm,
          }}
          selectedRow={selectedAlcolockId}
          afterDelete={afterDelete}
          afterEdit={afterEdit}
          onRowClick={onClickRow}
          updateTable={[updateTable, selectedBranch]}
        />
      </PageWrapper>

      {selectedAlcolockId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo
            infoContent={
              <AlkozamkiInfo
                updateData={updateInfo}
                toggleUpdateInfo={toggleUpdateInfo}
                selectedAlcolockId={selectedAlcolockId}
                toggleUpdateTable={toggleUpdateTable}
              />
            }
            historyContent={
              <EventsHistory type={HistoryTypes.byAlcolock} id={selectedAlcolockId} />
            }
          />
        </Aside>
      )}
    </>
  );
};

export default Alkozamki;
