/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';

import { getItem, removeItem, setItem } from '@shared/model/store/localStorage';

export enum Actions {
  CLEAR = 'clear',
  GET = 'get',
  SET = 'set',
  REMOVE = 'remove',
}

interface UseLocalStorageArgs<T> {
  action?: Actions;
  key: string;
  value?: T | null;
}

export function useLocalStorage<T>({
  action = Actions.GET,
  key,
  value = null,
}: UseLocalStorageArgs<T>) {
  const [state, setState] = useState<T | null | undefined>(() => {
    const data = getItem<T>(key);
    if (!data) {
      return value;
    }
    return data;
  });
  const keyRef = useRef(key);

  function getState(key: string) {
    const data = getItem<T>(key);
    if (!data) {
      setItemState(value);
      return;
    }
    setState(data);
  }

  function setItemState(value: T) {
    setItem(keyRef.current, value);
    setState(value);
  }

  function clearState(key: string) {
    removeItem(key);
    setState(null);
  }

  //   useEffect(() => {
  //     if (action === Actions.GET || !action) {
  //     }
  //   }, []);

  return { state, getState, setItemState, clearState };
}
