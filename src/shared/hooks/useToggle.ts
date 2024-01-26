import { useState } from 'react';

export const useToggle = (initState = false): [boolean, () => void, (state: boolean) => void] => {
  const [state, setState] = useState(initState);
  const toggle = () => setState(!state);
  const set = (payload: boolean) => setState(payload);

  return [state, toggle, set];
};
