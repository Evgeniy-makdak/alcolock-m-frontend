import { useEffect, useRef, useState } from 'react';

import PhotosApi from '../../../../data/api/photos/photos_api';
import Loader from '../loader/Loader';

const Image = ({ url }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const lastRequest = useRef(null);

  useEffect(() => {
    setImageUrl(null);
    lastRequest.current?.abort();
    const { promise, controller } = PhotosApi.getItem(url);
    lastRequest.current = controller;
    setLoading(true);

    promise
      .then(({ res }) => res.blob())
      .then((blob) => {
        lastRequest.current = null;
        setImageUrl(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        lastRequest.current = null;
        setLoading(false);
        console.log('Image err', err?.response ?? err);
      });

    return () => {
      lastRequest.current?.abort();
    };
  }, [url]);

  return (
    <Loader
      isLoading={loading}
      styles={{
        wrapper: (base) => ({
          ...base,
          height: '100%',
        }),
      }}>
      {!!imageUrl && <img src={imageUrl} alt="Image from server" />}
    </Loader>
  );
};

export default Image;
