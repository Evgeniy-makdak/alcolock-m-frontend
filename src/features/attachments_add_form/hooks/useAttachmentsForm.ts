/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';

import { useCreateAttachment } from '../api/createAttachment';

interface AttachmentAddForm {
  carId: number | null | undefined;
  driverId: number | null | undefined;
}

export const useAttachmentsForm = () => {
  const { register, setValue, getValues, setError, clearErrors, formState } =
    useForm<AttachmentAddForm>({
      defaultValues: {
        carId: null,
        driverId: null,
      },
    });
  const mutation = useCreateAttachment();

  const onSelectCar = (value: number[] | number) => {
    clearErrors(['driverId', 'carId']);
    if (Array.isArray(value)) return;
    setValue('carId', value);
  };

  const onSelectDriver = (value: number[] | number) => {
    clearErrors(['driverId', 'carId']);
    if (Array.isArray(value)) return;
    setValue('driverId', value);
  };

  const onAddAtachment = () => {
    const driverId = getValues('driverId');
    const vehicleId = getValues('carId');
    if (!driverId || !vehicleId) {
      !driverId && setError('driverId', {});
      !vehicleId && setError('carId', {});
      return;
    }
    mutation({
      driverId,
      vehicleId,
    });
  };

  return {
    register,
    onSelectCar,
    onSelectDriver,
    onAddAtachment,
    errorDriver: formState.errors?.driverId ? true : false,
    errorCar: formState.errors?.carId ? true : false,
  };
};
