import './Info.sass';

const Info = ({ fields, withoutPaddings = false }) => {
  // TODO - вынести мапинг данных из верстки
  return (
    <div className={`info ${withoutPaddings ? 'info_0-paddings' : ''}`}>
      {fields
        .filter((field) => field)
        .map((field, i) => {
          return (
            <div className={'info__row'} key={i}>
              <span>{field.label}</span>
              <span style={field.style ?? {}}>{field.value}</span>
            </div>
          );
        })}
    </div>
  );
};

export default Info;
