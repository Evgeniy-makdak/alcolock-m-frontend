/* eslint-disable no-empty-pattern */
import { useState } from 'react';

import { useToggle } from '@shared/hooks/useToggle';
import { getArrayValues } from '@shared/lib/getValuesFromForm';
import { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useGroupUserMoveFormApi } from '../api/useGroupUserMoveFormApi';
import type { GroupUserMoveFormProps } from '../ui/GroupUserMoveForm';

export const useGroupUserMoveForm = ({ user, close }: GroupUserMoveFormProps) => {
  const [branchSelect, setBranchSelect] = useState<Value[]>([]);
  const [openAlert, toggleAlert, closeAlert] = useToggle(false);
  const [error, setError] = useState(false);

  const onSelect = (_type: string, value: string | Value | (string | Value)[]) => {
    setError(false);
    const values = getArrayValues(value);
    setBranchSelect(values);
    closeAlert();
  };
  const { moveUser } = useGroupUserMoveFormApi();
  const handleOpenAlert = () => {
    if (branchSelect.length === 0) {
      setError(true);
      return;
    }
    toggleAlert();
  };

  const onSubmit = () => {
    if (branchSelect.length === 0) {
      setError(true);
      return;
    }
    closeAlert();
    moveUser({ userId: user.id, branchId: branchSelect[0]?.value });
    close();
  };
  const alertText = (
    <>
      При перемещении выбранного пользователя все его текущие связи с ТС будут <b>разорваны</b>.
      <br />
      <br />
      Пожалуйста, подтвердите действие.
    </>
  );
  const showAlert = openAlert && !error && branchSelect.length > 0;
  return {
    onSubmit,
    onSelect,
    showAlert,
    handleOpenAlert,
    error,
    branchSelect,
    closeAlert,
    alertText,
  };
};