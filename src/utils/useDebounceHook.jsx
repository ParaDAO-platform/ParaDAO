import React, { useState, useEffect } from "react";
const useDebounceHook = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    let timer = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
export default useDebounceHook;
