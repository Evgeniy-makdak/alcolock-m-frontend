import { useState } from 'react';

import { useToggle } from '@shared/hooks/useToggle';
import { getArrayFromValues, getArrayValues } from '@shared/lib/getValuesFromForm';
import type { ID } from '@shared/types/BaseQueryTypes';
import type { Value, Values } from '@shared/ui/search_multiple_select';

import { useGroupCarAddFormApi } from '../api/useGroupCarAddFormApi';

export const useGroupCarAddForm = (branchId: ID, close: () => void) => {
  const [cars, setCars] = useState<Values>([]);
  const [openAlert, toggleAlert, closeAlert] = useToggle(false);
  const [error, setError] = useState(false);
  const { mutate } = useGroupCarAddFormApi();

  const onSelect = (_type: string, value: string | Value | (string | Value)[]) => {
    setError(false);
    const values = getArrayValues(value);
    setCars(values);
    closeAlert();
  };
  const onSubmit = () => {
    if (cars.length === 0) {
      setError(true);
      return;
    }
    closeAlert();
    mutate({ branchId, ids: getArrayFromValues(cars) });
    close();
  };

  const handleOpenAlert = () => {
    if (cars.length === 0) {
      setError(true);
      return;
    }
    toggleAlert();
  };

  const showAlert = openAlert && !error && cars.length > 0;
  return { cars, onSelect, error, onSubmit, closeAlert, handleOpenAlert, showAlert };
};
