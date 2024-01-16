import { useEffect } from 'react';

import { userStore } from '@features/menu_button/model/store';
import ErrorViewer from '@shared/ui/error_viewer/ErrorViewer';
import Form from '@shared/ui/form/Form';
import Input from '@shared/ui/input/Input';
import Loader from '@shared/ui/loader/Loader';
import { getErrorMessagesFromServer } from '@shared/validations/server_error_handler';

const PasswordForm = ({ formSelectors, onValidSubmit }) => {
  const loading = userStore.changingPassword.useValue();
  const [error, setError] = userStore.changePasswordError.useState();
  const serverErrorMessages = getErrorMessagesFromServer(error);
  useEffect(() => {
    setError(null);
  }, []);

  return (
    <Loader isLoading={loading}>
      <Form onValidSubmit={onValidSubmit} formSelectors={formSelectors}>
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'currentPassword',
            label: 'Текущий пароль',
            type: 'password',
          }}
        />
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'newPassword',
            label: 'Новый пароль',
            type: 'password',
          }}
        />
      </Form>

      {!!serverErrorMessages.length && <ErrorViewer errorMessages={serverErrorMessages} />}
    </Loader>
  );
};

export default PasswordForm;
