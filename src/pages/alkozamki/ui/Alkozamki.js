import { AppConstants } from '@app';
import { AlkozamkiForm } from '@entities/alkozamki_form';
import { RowTableInfo } from '@entities/row_table_info';
import { EditTable } from '@features/edit_table';
import { UserPermissionsTypes } from '@features/menu_button';
import { PageWrapper } from '@layout/page_wrapper';
import { Aside } from '@shared/ui/aside';

import { useAlkozamki } from '../hooks/useAlkozamki';
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
import style from './Alkozamki.module.scss';

const Alkozamki = () => {
  const {
    loading,
    selectedBranch,
    userData,
    tabs,
    updateTable,
    selectedAlcolockId,
    onClickRow,
    afterDelete,
    afterEdit,
    handleCloseAside,
  } = useAlkozamki();
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
            userData?.permissions.alcolocks === UserPermissionsTypes.CREATE ? deleteItem : null
          }
          addItemPromise={
            userData?.permissions.alcolocks === UserPermissionsTypes.CREATE ? addItem : null
          }
          editItemPromise={
            userData.permissions.alcolocks === UserPermissionsTypes.CREATE ? changeItem : null
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
          marginControls={style.marginTableControls}
        />
      </PageWrapper>

      {selectedAlcolockId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo key={selectedAlcolockId} tabs={tabs} />
        </Aside>
      )}
    </>
  );
};

export default Alkozamki;
