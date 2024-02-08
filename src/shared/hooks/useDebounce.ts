import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value?: string, time?: number): [string] => {
  const [state, setState] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      setState(value);
      ref.current = setTimeout(() => {
        clearTimeout(ref.current);
        ref.current = null;
      }, time);
    } else {
      ref.current = setTimeout(() => {
        setState(value);
        clearTimeout(ref.current);
        ref.current = null;
      }, time || 500);
    }
    return () => {
      clearTimeout(ref.current);
    };
  }, [value, ref.current]);

  if (ref.current) return [state];
  return [value];
};
