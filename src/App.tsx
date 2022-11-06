import { FC, useEffect } from 'react';
import { DailyTasks } from './features/tasks/components/DailyTasks';
import { lightThemeClass } from './styles/theme.css';

export const App: FC = () => {
  useEffect(() => {
    document.body.classList.add(lightThemeClass);
  }, []);
  return <DailyTasks />;
};

/**
 * TODO:
 * - theme
 * - toast
 * - FLIP
 * - primary color
 *   - aggregate
 *   - start
 */
