import * as yup from 'yup';

export interface Form {
  name: string;
}

export const schema = yup.object<Form>({
  name: yup.string().min(1, 'Обязательное поле').required('Обязательное поле'),
});
