import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  backgroundColor: vars.color.neutralLighter,
  padding: 10,
});

export const row = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'self-start',
  gap: 10,
});

export const fieldGroup = style({
  flex: 1,
});

export const startButton = style({
  marginTop: 3,
});

export const startButtons = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  marginTop: 10,
  gap: 10,
});
