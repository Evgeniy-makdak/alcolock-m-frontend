import { AppConstants } from '@app';
import { GroupForm } from '@entities/groups_form';
import { RowTableInfo } from '@entities/row_table_info';
import { EditTable } from '@features/edit_table';
import { PageWrapper } from '@layout/page_wrapper';
import { testids } from '@shared/const/testid';
import { Aside } from '@shared/ui/aside';

import { useGroups } from '../hooks/useGroups';
import { ADD_POPUP_TITLE, DELETE_POPUP_TITLE, EDIT_POPUP_TITLE, HEADERS } from '../lib/const';
import { getDeletePopupBody, getRowsTemplate } from '../lib/helpers';
import {
  GroupsSortTypes,
  addGroup,
  deleteGroup,
  editGroupName,
  uploadGroupsList,
} from '../model/effects';
import { addGroupFormSelectors, editGroupFormSelectors } from '../model/forms';
import style from './Group.module.scss';

const Groups = () => {
  const {
    selectedGroupId,
    onCloseAside,
    loading,
    onClickRow,
    afterDelete,
    afterEdit,
    tabs,
    groupName,
  } = useGroups();
  return (
    <>
      <PageWrapper>
        <EditTable
          loading={loading}
          headers={HEADERS}
          getRowsTemplate={getRowsTemplate}
          initOrderType={AppConstants.OrderTypes.asc}
          initOrderBy={GroupsSortTypes.byName}
          uploadListPromise={uploadGroupsList}
          deleteItemPromise={deleteGroup}
          addItemPromise={addGroup}
          editItemPromise={editGroupName}
          addFormSelectors={addGroupFormSelectors}
          editFormSelectors={editGroupFormSelectors}
          deletePopupParams={{
            title: DELETE_POPUP_TITLE,
            getBody: getDeletePopupBody,
          }}
          addPopupParams={{
            title: ADD_POPUP_TITLE,
            Body: GroupForm,
          }}
          editPopupParams={{
            title: EDIT_POPUP_TITLE,
            Body: GroupForm,
          }}
          selectedRow={selectedGroupId}
          afterDelete={afterDelete}
          onRowClick={onClickRow}
          afterEdit={afterEdit}
          marginControls={style.marginControls}
          tableControlTestId={{
            inputSearch: testids.page_groups.groups_widget_header.GROUPS_WIDGET_HEADER_SEARCH_INPUT,
            inputStart: testids.page_groups.groups_widget_header.GROUPS_WIDGET_HEADER_FROM_DATE,
            inputEnd: testids.page_groups.groups_widget_header.GROUPS_WIDGET_HEADER_TO_DATE,
          }}
          testIdsForTable={{
            table: testids.page_groups.groups_widget_table.GROUPS_WIDGET_TABLE,
            headerItem: testids.page_groups.groups_widget_table.GROUPS_WIDGET_TABLE_HEADER_ITEM,
            row: testids.page_groups.groups_widget_table.GROUPS_WIDGET_TABLE_BODY_ITEM,
            rowActionEdit:
              testids.page_groups.groups_widget_table.GROUPS_WIDGET_TABLE_BODY_ITEM_ACTION_EDIT,
            rowActionDelete:
              testids.page_groups.groups_widget_table.GROUPS_WIDGET_TABLE_BODY_ITEM_ACTION_DELETE,
          }}
        />
      </PageWrapper>

      {selectedGroupId && (
        <Aside onClose={onCloseAside}>
          <div className={style.infoTab}>
            <div className={style.name}>
              <span>{groupName}</span>
            </div>
            <RowTableInfo key={selectedGroupId} tabs={tabs} />
          </div>
        </Aside>
      )}
    </>
  );
};

export default Groups;
