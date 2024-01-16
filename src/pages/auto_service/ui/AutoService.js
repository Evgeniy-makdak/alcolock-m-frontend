import { useEffect, useState } from 'react';

import AppConstants from '@app/lib/app_constants';
import RowTableInfo from '@entities/row_table_info/ui/RowTableInfo';
import EditTable from '@features/edit_table/ui/EditTable';
import EventsHistory, { HistoryTypes } from '@features/events_history/ui/EventsHistory';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import Aside from '@shared/ui/aside/Aside';
import AutoServiceInfo from '@widgets/auto_service/ui/AutoServiceInfo';

import { HEADERS, getRowsTemplate } from '../lib/const';
import { AutoServiceSortTypes, uploadAutoServiceList } from '../model/effects';
import { autoServiceStore } from '../model/store';

const AutoService = () => {
  const [updateTable, toggleUpdateTable] = useToggle();
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();
  const loading = autoServiceStore.listLoading.useValue();
  const selectedDeviceId = autoServiceStore.selectedDeviceId.useValue();
  const [updateAfterTimeout, toggleUpdateAfterTimeout] = useToggle();
  const [updateByInterval, toggleUpdateByInterval] = useToggle();

  useEffect(() => {
    toggleUpdateTable();
    toggleUpdateInfo();
  }, [updateAfterTimeout, updateByInterval]);

  useEffect(() => {
    setInterval(() => {
      toggleUpdateByInterval();
    }, 60000);
  }, []);

  const onClickRow = (id) => setSelectedItemId(id);
  const handleCloseAside = () => setSelectedItemId(null);

  return (
    <>
      <div className={'page auto-service'}>
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
        />
      </div>

      {selectedItemId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo
            historyContent={<EventsHistory type={HistoryTypes.byAlcolock} id={selectedDeviceId} />}
            infoContent={
              <AutoServiceInfo
                updateData={updateInfo}
                toggleUpdateInfo={toggleUpdateInfo}
                selectedId={selectedItemId}
                toggleUpdateTable={toggleUpdateTable}
              />
            }
          />
        </Aside>
      )}
    </>
  );
};

export default AutoService;
