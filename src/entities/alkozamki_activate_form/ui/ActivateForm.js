import { eventsStore } from '@pages/events/model/store';
import { Form } from '@shared/ui/form';
import { Input } from '@shared/ui/input';
import { Loader } from '@shared/ui/loader';

import { LABEL_TEXT } from '../lib/const';

export const ActivateForm = ({ formSelectors, onValidSubmit }) => {
  const loading = eventsStore.activateServiceLoading.useValue();

  return (
    <Loader isLoading={loading}>
      <Form formSelectors={formSelectors} onValidSubmit={onValidSubmit}>
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            type: 'number',
            name: 'duration',
            label: LABEL_TEXT,
          }}
        />
      </Form>
    </Loader>
  );
};
