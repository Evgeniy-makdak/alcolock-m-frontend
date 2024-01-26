import { AppConstants } from '@app';
import { RowTableInfo } from '@entities/row_table_info';
import { EditTable } from '@features/edit_table';
import { PageWrapper } from '@layout/page_wrapper';
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
