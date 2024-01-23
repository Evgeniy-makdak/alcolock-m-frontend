import { useEffect } from 'react';

import { getItem } from '@pages/alkozamki/model/effects';
import { alkozamkiStore } from '@pages/alkozamki/model/store';
import { searchCars } from '@pages/vehicles/model/effects';
import { InputsColumnWrapper } from '@shared/components/Inputs_column_wrapper/InputsColumnWrapper';
import { Form } from '@shared/ui/form';
import { Input } from '@shared/ui/input';
import { Loader } from '@shared/ui/loader';
import { SearchSelect } from '@shared/ui/search_select';

import { LABEL_TEXT } from '../lib/conts';

export const AlkozamkiForm = ({ formSelectors, onValidSubmit, selectedItem }) => {
  const setInitData = formSelectors.useSetInitFormData();
  // TODO убрать сторы из форм
  const loading = alkozamkiStore.loadingData.useValue();
  const creating = alkozamkiStore.creating.useValue();
  const changing = alkozamkiStore.changing.useValue();

  useEffect(() => {
    if (selectedItem) {
      getItem(selectedItem.id)
        .then((res) => {
          if (res) {
            setInitData(res);
          }
        })
        .catch((err) => {
          console.log('AlkozamkiForm get data error', err?.response ?? err);
        });
    }
  }, [selectedItem]);

  const selectValueFormatter = (item) => {
    return item
      ? {
          value: item,
          label: `${item.manufacturer} ${item.model}, ${item.registrationNumber}`,
        }
      : null;
  };

  return (
    <Loader isLoading={!!loading || !!creating || !!changing}>
      <Form formSelectors={formSelectors} onValidSubmit={onValidSubmit}>
        <InputsColumnWrapper>
          <Input
            formSelectors={formSelectors}
            fieldParams={{
              name: LABEL_TEXT.name.name,
              label: LABEL_TEXT.name.label,
            }}
          />
          <Input
            formSelectors={formSelectors}
            fieldParams={{
              name: LABEL_TEXT.serialNumber.name,
              label: LABEL_TEXT.serialNumber.label,
            }}
            disabled={!!selectedItem}
          />
          <Input
            formSelectors={formSelectors}
            fieldParams={{
              name: LABEL_TEXT.serviceId.name,
              label: LABEL_TEXT.serviceId.label,
            }}
          />
          <SearchSelect
            formSelectors={formSelectors}
            fieldParams={{
              name: LABEL_TEXT.vehicle.name,
              label: LABEL_TEXT.vehicle.label,
            }}
            onSearch={(query) => searchCars({ query: query, withoutAlcolock: true })}
            valueFormatter={selectValueFormatter}
          />
        </InputsColumnWrapper>
      </Form>
    </Loader>
  );
};
