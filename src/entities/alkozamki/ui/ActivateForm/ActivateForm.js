import { eventsStore } from '@pages/events/model/store';
import Form from '@shared/ui/form/Form';
import Input from '@shared/ui/input/Input';
import Loader from '@shared/ui/loader/Loader';

const ActivateForm = ({ formSelectors, onValidSubmit }) => {
  const loading = eventsStore.activateServiceLoading.useValue();

  return (
    <Loader isLoading={loading}>
      <Form formSelectors={formSelectors} onValidSubmit={onValidSubmit}>
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            type: 'number',
            name: 'duration',
            label: 'Период активации, ч',
          }}
        />
      </Form>
    </Loader>
  );
};

export default ActivateForm;
