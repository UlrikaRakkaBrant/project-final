import { useEffect, useState } from 'react';
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : initialValue;
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}
