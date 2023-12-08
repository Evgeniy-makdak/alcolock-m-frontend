import './Authorization.sass'
import Logo from "../../shared/components/logo/Logo";
import Form from "../../shared/ui/form/Form";
import {authFormSelectors} from "../../../internal/effector/authorization/forms";
import {onAuthorization} from "../../../internal/effector/app/effects";
import {useNavigate} from "react-router-dom";
import {appStore, AuthStatus} from "../../../internal/effector/app/store";
import {useEffect} from "react";
import RoutePaths from "../../../internal/route_paths";
import Input from "../../shared/ui/form/components/Input";
import Loader from "../../shared/components/loader/Loader";
import FormCheckbox from "../../shared/ui/form/components/FormCheckbox";
import {authStore} from "../../../internal/effector/authorization/store";
import {getErrorMessagesFromServer} from "../../../internal/validations/server_error_handler";
import ErrorViewer from "../../shared/components/errors/ErrorViewer";

const Authorization = () => {
  const isValidForm = authFormSelectors.useIsFormValid()
  const onClickSubmit = authFormSelectors.useOnClickSubmit()
  const navigate = useNavigate()
  const isAuth = appStore.appAuthStatus.useValue() === AuthStatus.auth
  const resetForm = authFormSelectors.useResetForm()
  const loading = appStore.isAuthorization.useValue()
  const [error, setError] = authStore.authError.useState()
  const serverErrorMessages = getErrorMessagesFromServer(error)

  useEffect(() => {
    setError(null)
    if (isAuth) {
      navigate(RoutePaths.events)
    }

    return () => {
      resetForm()
    }
  }, [isAuth])

  const handleSubmit = () => {
    if (!isValidForm) return

    onClickSubmit()
  }

  const handleAuthorization = (data) => {
    onAuthorization({
      data,
      navigate
    })
      .catch(err => {
        console.log('handleAuthorization error', err?.response)
      })
  }

  return (
    <div
      className={'authorization'}
    >
      <Logo />
      <div className="authorization__wrapper">
        <h1>Информационная система <br/> «Алкозамок»</h1>

        <Loader
          isLoading={loading}
          styles={{
            wrapper: (base) => ({
              ...base,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            })
          }}
        >
          <Form
            formSelectors={authFormSelectors}
            onValidSubmit={handleAuthorization}
          >
            <Input
              formSelectors={authFormSelectors}
              fieldParams={{
                name: 'username',
                label: 'Логин',
              }}
            />
            <Input
              formSelectors={authFormSelectors}
              fieldParams={{
                name: 'password',
                label: 'Пароль',
                type: 'password'
              }}
            />

            <FormCheckbox
              formSelectors={authFormSelectors}
              fieldParams={{
                name: 'rememberMe',
                label: 'Запомнить меня',
              }}
            />
          </Form>

          {!!serverErrorMessages.length &&
            <div
              style={{
                marginBottom: '24px'
              }}
            >
              <ErrorViewer errorMessages={serverErrorMessages}/>
            </div>
          }

          <button
            className={'authorization__btn'}
            disabled={!isValidForm}
            onClick={handleSubmit}
          >
            Вход
          </button>
        </Loader>
      </div>
    </div>
  )
}

export default Authorization
