import { useState } from 'react';

import { useToggle } from '@shared/hooks/useToggle';
import { getArrayValues } from '@shared/lib/getValuesFromForm';
import { FormCheckbox } from '@shared/ui/form_checkbox';
import { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useGroupCarMoveFormApi } from '../api/useGroupCarMoveFormApi';
import type { GroupCarMoveFormProps } from '../ui/GroupCarMoveForm';
import style from '../ui/GroupCarMoveForm.module.scss';

export const useGroupCarMoveForm = ({ car, close }: GroupCarMoveFormProps) => {
  const [branchSelect, setBranchSelect] = useState<Value[]>([]);
  const [widthDevice, setWidthDevice] = useState(false);
  const [openAlert, toggleAlert, closeAlert] = useToggle(false);
  const [error, setError] = useState(false);

  const onSelect = (_type: string, value: string | Value | (string | Value)[]) => {
    setError(false);
    const values = getArrayValues(value);
    setBranchSelect(values);
    closeAlert();
  };
  const { moveCar } = useGroupCarMoveFormApi();
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
    moveCar({ carId: car.id, branchId: branchSelect[0]?.value, widthDevice });
    close();
  };
  const alertText = (
    <>
      При перемещении выбранного ТС все его текущие связи с алкозамками могут быть <b>разорваны</b>.
      <br />
      <FormCheckbox
        checkBox={{
          checked: widthDevice,
          onChange(_event, checked) {
            setWidthDevice(checked);
          },
        }}
        label="Сохранить связи с алкозамками"
      />
      <br />
      <b className={style.alertText}>Будут разорваны связи ТС - водитель в пределах этой группы</b>
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