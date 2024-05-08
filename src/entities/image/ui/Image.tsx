import { Dialog, Paper, ThemeProvider, createTheme } from '@mui/material';

import { useToggle } from '@shared/hooks/useToggle';
import { Loader } from '@shared/ui/loader';

import { useImage } from '../hooks/useImage';
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
  const { img, isLoading } = useImage(url);
  const [open, toggle, reset] = useToggle(false);

  return (
    <Loader
      isLoading={isLoading}
      props={{
        className: style.wrapper,
      }}>
      <Paper onClick={toggle} variant="outlined" className={style.paper}>
        {!!img && <img className={style.img} src={img} alt="Image from server" />}
      </Paper>
      <ThemeProvider theme={theme}>
        <Dialog className={style.dialog} onClose={reset} open={open}>
          <img className={style.imgFull} src={img} alt="Image from server" />
        </Dialog>
      </ThemeProvider>
    </Loader>
  );
};
