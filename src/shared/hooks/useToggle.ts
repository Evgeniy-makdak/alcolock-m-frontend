import { useState } from 'react';

export const useToggle = (
  initState = false,
): [boolean, () => void, () => void, (state: boolean) => void] => {
  const [state, setState] = useState(initState);
  const toggle = () => setState(!state);
  const set = (payload: boolean) => setState(payload);
  const reset = () => setState(false);

  return [state, toggle, reset, set];
};
