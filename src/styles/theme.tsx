import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { darkThemeClass, lightThemeClass } from './theme.css';

const savedValue = localStorage.getItem('RECAPP_isDarkMode');
const initialValue = savedValue
  ? savedValue === '1'
  : window.matchMedia('(prefers-color-scheme: dark)').matches;

const stateContext = createContext(initialValue);
const stateSetterContext = createContext<(isDarkMode: boolean) => void>(
  () => undefined,
);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(initialValue);
  useEffect(() => {
    document.body.classList.toggle(lightThemeClass, !isDarkMode);
    document.body.classList.toggle(darkThemeClass, isDarkMode);
  }, [isDarkMode]);

  return (
    <stateContext.Provider value={isDarkMode}>
      <stateSetterContext.Provider value={setIsDarkMode}>
        {children}
      </stateSetterContext.Provider>
    </stateContext.Provider>
  );
};

export function useIsDarkMode() {
  return useContext(stateContext);
}

export function useChangeTheme() {
  const setIsDarkMode = useContext(stateSetterContext);
  return useCallback(
    (theme: 'light' | 'dark') => {
      const isDark = theme === 'dark';
      setIsDarkMode(isDark);
      localStorage.setItem('RECAPP_isDarkMode', isDark ? '1' : '0');
    },
    [setIsDarkMode],
  );
}
