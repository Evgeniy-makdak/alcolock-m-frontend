import { useEffect } from 'react';

import { userStore } from '@features/menu_button/model/store';
import { getAttachment } from '@pages/attachments/model/effects';
import { attachmentsStore } from '@pages/attachments/model/store';
import { searchDrivers } from '@pages/users/model/effects';
import { searchCars } from '@pages/vehicles/model/effects';
import { InputsColumnWrapper } from '@shared/components/Inputs_column_wrapper/InputsColumnWrapper';
import { Form } from '@shared/ui/form';
import { Loader } from '@shared/ui/loader';
import { SearchSelect } from '@shared/ui/search_select';
import { Formatters } from '@shared/utils/formatters';

import { LABEL_TEXT } from '../lib/const';

export const AttachmentsForm = ({ formSelectors, onValidSubmit, selectedItem }) => {
  const setInitData = formSelectors.useSetInitFormData();
  const user = userStore.userData.useValue();
  const loading = attachmentsStore.attachmentsLoading.useValue();
  const creating = attachmentsStore.creating.useValue();
  const changing = attachmentsStore.changing.useValue();

  const isLoading = !!loading || !!creating || changing;

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
          label: `${Formatters.nameFormatter(item)} (${item.email})`,
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
    <Loader isLoading={isLoading}>
      <Form onValidSubmit={onValidSubmit} formSelectors={formSelectors}>
        <InputsColumnWrapper>
          <SearchSelect
            formSelectors={formSelectors}
            fieldParams={{
              name: LABEL_TEXT.vehicle.name,
              label: LABEL_TEXT.vehicle.label,
            }}
            valueFormatter={carSelectValueFormatter}
            onSearch={(query) => searchCars({ query })}
          />

          <SearchSelect
            formSelectors={formSelectors}
            fieldParams={{
              name: LABEL_TEXT.driver.name,
              label: LABEL_TEXT.driver.label,
            }}
            valueFormatter={driverSelectValueFormatter}
            onSearch={searchDrivers}
          />
        </InputsColumnWrapper>
      </Form>
    </Loader>
  );
};
