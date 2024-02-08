import style from './InputDate.module.scss';

interface InputDatesProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  inputStartTestId?: string;
  inputEndTestId?: string;
  valueStart?: string | number | readonly string[];
  valueEnd?: string | number | readonly string[];
  startDate?: number | string;
  maxDate?: number | string;
  endDate?: number | string;
  onChangeStartDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEndDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputDates = ({
  onChangeStartDate,
  onChangeEndDate,
  inputStartTestId,
  inputEndTestId,
  valueStart,
  valueEnd,
  startDate,
  maxDate,
  endDate,
}: InputDatesProps) => {
  return (
    <div className={style.datePickers}>
      <input
        data-testid={inputStartTestId}
        type={'date'}
        onChange={onChangeStartDate}
        value={valueStart}
        max={endDate ? endDate : maxDate}
      />

      <input
        data-testid={inputEndTestId}
        type={'date'}
        onChange={onChangeEndDate}
        value={valueEnd}
        min={startDate}
        max={maxDate}
      />
    </div>
  );
};
