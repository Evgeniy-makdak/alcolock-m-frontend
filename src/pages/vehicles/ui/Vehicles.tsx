/* eslint-disable @typescript-eslint/no-unused-vars */
import { RowTableInfo } from '@entities/row_table_info';
import { PageWrapper } from '@layout/page_wrapper';
import { Aside } from '@shared/ui/aside';
import { VehiclesTable } from '@widgets/vehicles_table';

import { useVehicles } from '../hooks/useVehicles';

const Vehicles = () => {
  const { handleCloseAside, onClickRow, tabs, selectedCarId } = useVehicles();

  return (
    <>
      <PageWrapper>
        <VehiclesTable onClickRow={onClickRow} />
      </PageWrapper>

      {selectedCarId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo key={selectedCarId} tabs={tabs} />
        </Aside>
      )}
    </>
  );
};

export default Vehicles;
