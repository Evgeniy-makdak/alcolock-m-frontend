import { AppConstants } from '@app';
import { RowTableInfo } from '@entities/row_table_info';
import { EditTable } from '@features/edit_table';
import { PageWrapper } from '@layout/page_wrapper';
import { testids } from '@shared/const/testid';
import { Aside } from '@shared/ui/aside';

import { useAutoService } from '../hooks/useAutoService';
import { HEADERS, getRowsTemplate } from '../lib/const';
import { AutoServiceSortTypes, uploadAutoServiceList } from '../model/effects';
import style from './AutoService.module.scss';

const AutoService = () => {
  const {
    selectedBranch,
    selectedItemId,
    updateTable,
    loading,
    tabs,
    onClickRow,
    toggleUpdateAfterTimeout,
    handleCloseAside,
  } = useAutoService();
  return (
    <>
      <PageWrapper>
        <EditTable
          loading={loading}
          headers={HEADERS}
          getRowsTemplate={(item) => getRowsTemplate(item, toggleUpdateAfterTimeout)}
          initOrderType={AppConstants.OrderTypes.desc}
          initOrderBy={AutoServiceSortTypes.byDate}
          uploadListPromise={uploadAutoServiceList}
          withoutAction={true}
          withoutAdd={true}
          updateTable={[updateTable, selectedBranch]}
          selectedRow={selectedItemId}
          onRowClick={onClickRow}
          marginControls={style.marginControls}
          tableControlTestId={{
            inputSearch:
              testids.page_avto_service.avto_service_widget_header
                .AVTO_SERVICE_WIDGET_HEADER_SEARCH_INPUT,
            inputStart:
              testids.page_avto_service.avto_service_widget_header
                .AVTO_SERVICE_WIDGET_HEADER_FROM_DATE,
            inputEnd:
              testids.page_avto_service.avto_service_widget_header
                .AVTO_SERVICE_WIDGET_HEADER_TO_DATE,
          }}
          testIdsForTable={{
            table: testids.page_avto_service.avto_service_widget_table.AVTO_SERVICE_WIDGET_TABLE,
            headerItem:
              testids.page_avto_service.avto_service_widget_table
                .AVTO_SERVICE_WIDGET_TABLE_HEADER_ITEM,
            row: testids.page_avto_service.avto_service_widget_table
              .AVTO_SERVICE_WIDGET_TABLE_BODY_ITEM,
            rowActionEdit:
              testids.page_avto_service.avto_service_widget_table
                .AVTO_SERVICE_WIDGET_TABLE_BODY_ITEM_ACTION_EDIT,
            rowActionDelete:
              testids.page_avto_service.avto_service_widget_table
                .AVTO_SERVICE_WIDGET_TABLE_BODY_ITEM_ACTION_DELETE,
          }}
        />
      </PageWrapper>

      {selectedItemId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo key={selectedItemId} tabs={tabs} />
        </Aside>
      )}
    </>
  );
};

export default AutoService;
