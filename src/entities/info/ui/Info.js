import style from './Info.module.scss';

const Info = ({ fields, withoutPaddings = false }) => {
  // TODO - вынести мапинг данных из верстки
  return (
    <div className={`${withoutPaddings ? style.zeroPaddings : style.paddings} ${style.info}`}>
      {fields
        .filter((field) => field)
        .map((field, i) => {
          return (
            <div className={style.row} key={i}>
              <span>{field.label}</span>
              <span style={field.style ?? {}}>{field.value}</span>
            </div>
          );
        })}
    </div>
  );
};

export default Info;
