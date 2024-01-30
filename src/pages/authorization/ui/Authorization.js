import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutePaths } from '@app';
import { onAuthorization } from '@app/model/effects';
import { AuthStatus, appStore } from '@app/model/store';
import { InputsColumnWrapper } from '@shared/components/Inputs_column_wrapper/InputsColumnWrapper';
import { testids } from '@shared/const/testid';
import { ErrorViewer } from '@shared/ui/error_viewer';
import { Form } from '@shared/ui/form';
import { FormCheckbox } from '@shared/ui/form_checkbox';
import { Input } from '@shared/ui/input';
import { Loader } from '@shared/ui/loader';
import { Logo } from '@shared/ui/logo';
import { getErrorMessagesFromServer } from '@shared/validations/server_error_handler';

import { authFormSelectors } from '../model/forms';
import { authStore } from '../model/store';
import style from './Authorization.module.scss';

export const Authorization = () => {
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
    if (isAuth && !loading) {
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
    <div className={style.authorization}>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.wrapper}>
        <h1 className={style.title}>
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
          <Form
            testid={testids.page_auth.AUTH_FORM}
            className={style.form}
            formSelectors={authFormSelectors}
            onValidSubmit={handleAuthorization}>
            <InputsColumnWrapper>
              <Input
                formSelectors={authFormSelectors}
                fieldParams={{
                  name: 'username',
                  label: 'Логин',
                }}
                testid={testids.page_auth.AUTH_INPUT_LOGIN}
              />

              <Input
                formSelectors={authFormSelectors}
                fieldParams={{
                  name: 'password',
                  label: 'Пароль',
                  type: 'password',
                }}
                testid={testids.page_auth.AUTH_INPUT_PASSWORD}
              />

              <FormCheckbox
                formSelectors={authFormSelectors}
                fieldParams={{
                  name: 'rememberMe',
                  label: 'Запомнить меня',
                }}
                disabled={false}
                testid={testids.page_auth.AUTH_INPUT_REMEMBER}
              />
            </InputsColumnWrapper>
          </Form>

          {!!serverErrorMessages.length && (
            <div
              style={{
                marginBottom: '24px',
              }}>
              <ErrorViewer errorMessages={serverErrorMessages} />
            </div>
          )}

          <button
            data-testid={testids.page_auth.AUTH_BUTTON_ENTER}
            className={style.button}
            disabled={!isValidForm}
            onClick={handleSubmit}>
            Вход
          </button>
        </Loader>
      </div>
    </div>
  );
};
