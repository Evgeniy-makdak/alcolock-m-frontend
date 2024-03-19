// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateSchema } from 'yup';

declare module 'yup' {
  interface MyDateSchema {
    dayjs(selectableDays: number[]): DateSchema;
  }
}
