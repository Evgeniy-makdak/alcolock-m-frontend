const timer: { timer: null | number | NodeJS.Timeout } = { timer: null };

export const debounce = (time: number, callBack?: (value: string) => void) => {
  if (!callBack) return;
  return function (value?: string) {
    if (!timer.timer) {
      callBack(value);
      timer.timer = setTimeout(() => {
        clearTimeout(timer.timer);
        timer.timer = null;
      }, time || 500);
    } else {
      clearTimeout(timer.timer);
      timer.timer = setTimeout(() => {
        callBack(value);
        clearTimeout(timer.timer);
        timer.timer = null;
      }, time || 500);
    }
  };
};
