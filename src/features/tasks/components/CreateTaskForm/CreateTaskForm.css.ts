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
