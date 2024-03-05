import { useState } from 'react';

import { useToggle } from '@shared/hooks/useToggle';
import { getArrayValues } from '@shared/lib/getValuesFromForm';
import { FormCheckbox } from '@shared/ui/form_checkbox';
import { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useGroupAlcolockMoveFormApi } from '../api/useGroupAlcolockMoveFormApi';
import type { GroupAlcolockMoveFormProps } from '../ui/GroupAlcolockMoveForm';

export const useGroupAlcolockMoveForm = ({ alcolock, close }: GroupAlcolockMoveFormProps) => {
  const [branchSelect, setBranchSelect] = useState<Value[]>([]);
  const [withVehicle, setWithVehicle] = useState(false);
  const [openAlert, toggleAlert, closeAlert] = useToggle(false);
  const [error, setError] = useState(false);

  const onSelect = (_type: string, value: string | Value | (string | Value)[]) => {
    setError(false);
    const values = getArrayValues(value);
    setBranchSelect(values);
    closeAlert();
  };
  const { moveAlcolock } = useGroupAlcolockMoveFormApi();
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
    moveAlcolock({ alcolockId: alcolock.id, branchId: branchSelect[0]?.value, withVehicle });
    close();
  };
  const alertText = (
    <>
      При перемещении выбранного алкозамка все его текущие связи с ТС могут быть <b>разорваны</b>.
      <br />
      <FormCheckbox
        checkBox={{
          checked: withVehicle,
          onChange(_event, checked) {
            setWithVehicle(checked);
          },
        }}
        label="Сохранить связи с ТС"
      />
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
