import { FC } from 'react';
import { DailyTasks } from './features/tasks/components/DailyTasks';
import { ThemeProvider } from './styles/theme';

export const App: FC = () => (
  <ThemeProvider>
    <DailyTasks />
  </ThemeProvider>
);
