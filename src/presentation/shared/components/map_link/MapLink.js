import './MapLink.sass'

const MapLink = ({latitude, longitude}) => {
  const url = `https://yandex.ru/maps/?ll=${longitude},${latitude}&z=10&pt=${longitude},${latitude}`;

  return (
    <a
      className={'map-link'}
      target={'_blank'}
      href={url}
      rel="noopener noreferrer"
    >
      {latitude} {longitude}
    </a>
  )
}

export default MapLink
