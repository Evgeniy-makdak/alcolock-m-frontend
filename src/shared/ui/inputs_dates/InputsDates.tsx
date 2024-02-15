import { type Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

import { InputDate } from '../input_date/InputDate';
import style from './InputDate.module.scss';

interface InputsDatesProps {
  inputStartTestId?: string;
  inputEndTestId?: string;
  maxDate?: Dayjs;
  minDate?: Dayjs;
  onChangeStartDate?: (value: Dayjs) => void;
  onChangeEndDate?: (value: Dayjs) => void;
  valueStartDatePicker?: Dayjs;
  valueEndDatePicker?: Dayjs;
  onClear?: () => void;
}

export const InputsDates = ({
  valueStartDatePicker,
  valueEndDatePicker,
  onChangeStartDate,
  onChangeEndDate,
  inputStartTestId,
  inputEndTestId,
}: InputsDatesProps) => {
  return (
    <div className={style.datePickers}>
      <InputDate
        testid={inputStartTestId}
        value={valueStartDatePicker}
        onChange={onChangeStartDate}
      />
      <InputDate testid={inputEndTestId} value={valueEndDatePicker} onChange={onChangeEndDate} />
    </div>
  );
};
