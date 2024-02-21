import { useEffect, useRef, useState } from 'react';

import { Dialog, Paper, ThemeProvider, createTheme } from '@mui/material';

import { useToggle } from '@shared/hooks/useToggle';
import { Loader } from '@shared/ui/loader';

import PhotosApi from '../api/photos_api';
import style from './Image.module.scss';

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          '.MuiDialog-paper': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
});

export const Image = ({ url }: { url: string }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, toggle, reset] = useToggle(false);
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
      props={{
        className: style.wrapper,
      }}>
      <Paper onClick={toggle} variant="outlined" className={style.paper}>
        {!!imageUrl && <img className={style.img} src={imageUrl} alt="Image from server" />}
      </Paper>
      <ThemeProvider theme={theme}>
        <Dialog className={style.dialog} onClose={reset} open={open}>
          <img className={style.imgFull} src={imageUrl} alt="Image from server" />
        </Dialog>
      </ThemeProvider>
    </Loader>
  );
};
