import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from '../lib/validation';

export const useActivateForm = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors: { duration },
    },
    // TODO => следить за обновлением библиотеки, должны исправить в 8 версии
  } = useForm<any>({
    defaultValues: { duration: 1 },
    resolver: yupResolver(schema),
  });
  const error = duration ? duration.message.toString() : '';
  return { register, handleSubmit, error, duration };
};
