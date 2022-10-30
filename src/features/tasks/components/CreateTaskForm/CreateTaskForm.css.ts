import { style } from '@vanilla-extract/css';

export const row = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 20,
});

export const formGroup = style({
  margin: 0,
  flex: 1,
});

export const recentTasksTitle = style({
  margin: '20px 0 10px',
});

export const startButtons = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',

  gap: 10,
});
