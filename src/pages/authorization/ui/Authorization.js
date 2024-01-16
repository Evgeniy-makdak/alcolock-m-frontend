import { useEffect } from 'react';

import RoutePaths from '@app/lib/route_paths';
import { onAuthorization } from '@app/model/effects';
import { AuthStatus, appStore } from '@app/model/store';
import ErrorViewer from '@shared/ui/error_viewer/ErrorViewer';
import Form from '@shared/ui/form/Form';
import FormCheckbox from '@shared/ui/form_checkbox/FormCheckbox';
import Input from '@shared/ui/input/Input';
import Loader from '@shared/ui/loader/Loader';
import Logo from '@shared/ui/logo/Logo';
import { getErrorMessagesFromServer } from '@shared/validations/server_error_handler';
import { useNavigate } from 'react-router-dom';

import { authFormSelectors } from '../model/forms';
import { authStore } from '../model/store';
import './Authorization.sass';

const Authorization = () => {
  const isValidForm = authFormSelectors.useIsFormValid();
  const onClickSubmit = authFormSelectors.useOnClickSubmit();
  const navigate = useNavigate();
  const isAuth = appStore.appAuthStatus.useValue() === AuthStatus.auth;
  const resetForm = authFormSelectors.useResetForm();
  const loading = appStore.isAuthorization.useValue();
  const [error, setError] = authStore.authError.useState();
  const serverErrorMessages = getErrorMessagesFromServer(error);

  useEffect(() => {
    setError(null);
    if (isAuth) {
      navigate(RoutePaths.events);
    }

    return () => {
      resetForm();
    };
  }, [isAuth]);

  const handleSubmit = () => {
    if (!isValidForm) return;

    onClickSubmit();
  };

  const handleAuthorization = (data) => {
    onAuthorization({
      data,
      navigate,
    }).catch((err) => {
      console.log('handleAuthorization error', err?.response);
    });
  };

  return (
    <div className={'authorization'}>
      <Logo />
      <div className="authorization__wrapper">
        <h1>
          Информационная система <br /> «Алкозамок»
        </h1>

        <Loader
          isLoading={loading}
          styles={{
            wrapper: (base) => ({
              ...base,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }),
          }}>
          <Form formSelectors={authFormSelectors} onValidSubmit={handleAuthorization}>
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
                type: 'password',
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

          {!!serverErrorMessages.length && (
            <div
              style={{
                marginBottom: '24px',
              }}>
              <ErrorViewer errorMessages={serverErrorMessages} />
            </div>
          )}

          <button className={'authorization__btn'} disabled={!isValidForm} onClick={handleSubmit}>
            Вход
          </button>
        </Loader>
      </div>
    </div>
  );
};

export default Authorization;
