import style from './Info.module.scss';

interface Field {
  label?: string;
  style?: React.CSSProperties;
  value?: string;
}

interface InfoProps {
  fields: Field[];
  withoutPaddings?: boolean;
}

export const Info = ({ fields, withoutPaddings = false }: InfoProps) => {
  return (
    <div className={`${withoutPaddings ? style.zeroPaddings : style.paddings} ${style.info}`}>
      {fields.map((field, i) => {
        return (
          <div className={style?.row} key={i}>
            <span>{field?.label}</span>
            <span style={field?.style}>{field?.value}</span>
          </div>
        );
      })}
    </div>
  );
};
