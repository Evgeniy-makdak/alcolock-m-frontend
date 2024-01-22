import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutePaths } from '@app';
import { onAuthorization } from '@app/model/effects';
import { AuthStatus, appStore } from '@app/model/store';
import { InputsColumnWrapper } from '@shared/components/Inputs_column_wrapper/InputsColumnWrapper';
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

          <button className={style.button} disabled={!isValidForm} onClick={handleSubmit}>
            Вход
          </button>
        </Loader>
      </div>
    </div>
  );
};
