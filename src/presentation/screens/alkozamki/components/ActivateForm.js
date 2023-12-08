import Loader from "../../../shared/components/loader/Loader";
import Form from "../../../shared/ui/form/Form";
import Input from "../../../shared/ui/form/components/Input";
import {eventsStore} from "../../../../internal/effector/events/store";

const ActivateForm = (
  {
    formSelectors,
    onValidSubmit
  }) => {
  const loading = eventsStore.activateServiceLoading.useValue()

  return (
    <Loader isLoading={loading}>
      <Form
        formSelectors={formSelectors}
        onValidSubmit={onValidSubmit}
      >
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            type: 'number',
            name: 'duration',
            label: 'Период активации, ч'
          }}
        />
      </Form>
    </Loader>
  )
}

export default ActivateForm
