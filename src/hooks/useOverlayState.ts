import { useCallback, useState } from 'react';

export function useOverlayState<T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target instanceof Node && !ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
      document.removeEventListener('click', handleClick, {
        capture: true,
      });
    },
    [ref],
  );
  const toggle = useCallback(() => {
    document.removeEventListener('click', handleClick, {
      capture: true,
    });
    setIsOpen((prev) => {
      const newState = !prev;

      if (newState) {
        document.addEventListener('click', handleClick, {
          capture: true,
        });
      }
      return newState;
    });
  }, [handleClick]);

  return {
    isOpen,
    toggle,
  };
}
