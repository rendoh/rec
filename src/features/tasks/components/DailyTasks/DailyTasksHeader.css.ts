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

export const buttons = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  whiteSpace: 'nowrap',
});

export const button = style({
  display: 'inline-flex',
  placeItems: 'center',
  gap: 5,
  cursor: 'pointer',
  padding: 5,
  borderRadius: 4,
  ':hover': {
    background: 'rgba(255, 255, 255, .075)',
  },
});
