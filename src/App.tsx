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
 * - [ ] theme
 * - [ ] toast
 * - [x] FLIP
 * - [x] primary color
 *   - [ ] aggregate
 *   - [x] start
 * - [ ] remove spinner
 * - [ ] trim whitespace before validate in rust
 * - [x] hide ! on loading
 */
