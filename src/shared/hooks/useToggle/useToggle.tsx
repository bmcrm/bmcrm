import { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, setIsOpen, toggle, open, close };
};
