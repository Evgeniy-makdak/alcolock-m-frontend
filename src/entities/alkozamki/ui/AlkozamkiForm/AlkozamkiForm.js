import { useEffect } from 'react';

import { getItem } from '@pages/alkozamki/model/effects';
import { alkozamkiStore } from '@pages/alkozamki/model/store';
import { searchCars } from '@pages/vehicles/model/effects';
import Form from '@shared/ui/form/Form';
import Input from '@shared/ui/input/Input';
import Loader from '@shared/ui/loader/Loader';
import SearchSelect from '@shared/ui/search_select/SearchSelect';

const AlkozamkiForm = ({ formSelectors, onValidSubmit, selectedItem }) => {
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
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'name',
            label: 'Наименование',
          }}
        />
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'serialNumber',
            label: 'Серийный номер',
          }}
          disabled={!!selectedItem}
        />
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'serviceId',
            label: 'uid',
          }}
        />
        <SearchSelect
          formSelectors={formSelectors}
          fieldParams={{
            name: 'vehicle',
            label: 'Установлен на ТС',
          }}
          onSearch={(query) => searchCars({ query: query, withoutAlcolock: true })}
          valueFormatter={selectValueFormatter}
        />
      </Form>
    </Loader>
  );
};

export default AlkozamkiForm;
