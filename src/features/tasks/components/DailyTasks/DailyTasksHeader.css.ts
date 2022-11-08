import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 50,
  paddingRight: 12,
});

export const controller = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  gridArea: 'center',
});

export const date = style({
  margin: '0 12px',
  letterSpacing: '.05em',
});

export const button = style({
  display: 'inline-grid',
  placeItems: 'center',
  cursor: 'pointer',
  padding: 5,
  borderRadius: 4,
  ':hover': {
    background: 'rgba(255, 255, 255, .1)',
  },
});

export const borderButton = style([
  button,
  {
    border: '1px solid rgba(255, 255, 255, .3)',
    padding: '3px 12px',
    ':disabled': {
      opacity: 0.3,
      pointerEvents: 'none',
    },
  },
]);

export const buttons = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});
