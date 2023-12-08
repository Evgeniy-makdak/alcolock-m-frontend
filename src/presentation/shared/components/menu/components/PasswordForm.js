import Form from "../../../ui/form/Form";
import Input from "../../../ui/form/components/Input";
import {userStore} from "../../../../../internal/effector/user/store";
import Loader from "../../loader/Loader";
import {useEffect} from "react";
import {getErrorMessagesFromServer} from "../../../../../internal/validations/server_error_handler";
import ErrorViewer from "../../errors/ErrorViewer";

const PasswordForm = (
  {
    formSelectors,
    onValidSubmit
  }) => {
  const loading = userStore.changingPassword.useValue()
  const [error, setError] = userStore.changePasswordError.useState()
  const serverErrorMessages = getErrorMessagesFromServer(error)
  useEffect(() => {
    setError(null)
  }, [])

  return (
    <Loader isLoading={loading}>
      <Form
        onValidSubmit={onValidSubmit}
        formSelectors={formSelectors}
      >
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'currentPassword',
            label: 'Текущий пароль',
            type: 'password'
          }}
        />
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'newPassword',
            label: 'Новый пароль',
            type: 'password'
          }}
        />
      </Form>

      {!!serverErrorMessages.length &&
        <ErrorViewer errorMessages={serverErrorMessages}/>
      }
    </Loader>
  )
}

export default PasswordForm
