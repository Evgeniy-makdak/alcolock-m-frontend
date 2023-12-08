import {useState} from "react";

export const useToggle = (initState = false) => {
  const [state, setState] = useState(initState)
  const toggle = () => setState(!state)
  const set = (payload) => setState(payload)

  return [state, toggle, set]
}
