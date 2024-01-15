import { useEffect } from 'react';

import { getAttachment } from '../../../../internal/effector/attachments/effects';
import { attachmentsStore } from '../../../../internal/effector/attachments/store';
import { userStore } from '../../../../internal/effector/user/store';
import { searchDrivers } from '../../../../internal/effector/users/effects';
import { searchCars } from '../../../../internal/effector/vehicles/effects';
import Formatters from '../../../../internal/utils/formatters';
import Loader from '../../../shared/components/loader/Loader';
import Form from '../../../shared/ui/form/Form';
import SearchSelect from '../../../shared/ui/form/components/SearchSelect';

const AttachmentsForm = ({ formSelectors, onValidSubmit, selectedItem }) => {
  const setInitData = formSelectors.useSetInitFormData();
  const user = userStore.userData.useValue();
  const loading = attachmentsStore.loadingData.useValue();
  const creating = attachmentsStore.creating.useValue();
  const changing = attachmentsStore.changing.useValue();

  useEffect(() => {
    if (selectedItem) {
      getAttachment(selectedItem.id)
        .then((res) => {
          if (res) {
            setInitData(res);
          }
        })
        .catch((err) => {
          console.log('AttachmentsForm get data error', err?.response ?? err);
        });
    } else {
      setInitData({
        user: user.id,
      });
    }
  }, [selectedItem]);

  const driverSelectValueFormatter = (item) => {
    return item
      ? {
          value: item,
          label: Formatters.nameFormatter(item) + ` (${item.email})`,
        }
      : null;
  };

  const carSelectValueFormatter = (item) => {
    return item
      ? {
          value: item,
          label: Formatters.carNameFormatter(item),
        }
      : null;
  };

  return (
    <Loader isLoading={!!loading || !!creating || !!changing}>
      <Form onValidSubmit={onValidSubmit} formSelectors={formSelectors}>
        <SearchSelect
          formSelectors={formSelectors}
          fieldParams={{
            name: 'vehicle',
            label: 'ТС',
          }}
          valueFormatter={carSelectValueFormatter}
          onSearch={(query) => searchCars({ query })}
        />

        <SearchSelect
          formSelectors={formSelectors}
          fieldParams={{
            name: 'driver',
            label: 'Водитель',
          }}
          valueFormatter={driverSelectValueFormatter}
          onSearch={searchDrivers}
        />
      </Form>
    </Loader>
  );
};

export default AttachmentsForm;
