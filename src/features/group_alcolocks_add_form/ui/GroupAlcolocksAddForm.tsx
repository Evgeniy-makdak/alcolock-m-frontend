import type { FC } from 'react';

import { Typography } from '@mui/material';

import { AlcolockSelect } from '@entities/alcolock_select';
import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';
import type { ID } from '@shared/types/BaseQueryTypes';
import { AppAlert } from '@shared/ui/alert';
import { Button } from '@shared/ui/button';

import { useGroupAlcolocksAddForm } from '../hooks/useGroupAlcolocksAddForm';
import style from './GroupAlcolocksAddForm.module.scss';

type GroupAlcolockAddFormProps = {
  branchId: ID;
  close: () => void;
};

const alertText = (
  <>
    При перемещении выбранных алкозмаков все их текущие связи с ТС будут <b>разорваны</b>.
    <br />
    <br />
    Пожалуйста, подтвердите действие.
  </>
);

export const GroupAlcolocksAddForm: FC<GroupAlcolockAddFormProps> = ({ branchId, close }) => {
  const { alcolocks, error, onSelect, onSubmit, showAlert, handleOpenAlert, closeAlert } =
    useGroupAlcolocksAddForm(branchId, close);
  return (
    <>
      <Typography fontWeight={600} marginBottom={2} variant="h6">
        Добавить алкозамки в группу
      </Typography>
      <AlcolockSelect
        notInBranch={branchId}
        vieBranch
        multiple
        name="alcolockId"
        error={error}
        value={alcolocks}
        setValueStore={onSelect}
        label="Поиск по алкозамкам"
      />
      {error && <span className={style.errorText}>Обязательное поле</span>}

      {!showAlert && (
        <ButtonFormWrapper>
          <Button onClick={handleOpenAlert}>добавить</Button>
          <Button onClick={close}>отмена</Button>
        </ButtonFormWrapper>
      )}

      <AppAlert
        severity="warning"
        title={'Внимание!'}
        text={alertText}
        onClose={closeAlert}
        onSubmit={onSubmit}
        open={showAlert}
        className={style.alert}
      />
    </>
  );
};
