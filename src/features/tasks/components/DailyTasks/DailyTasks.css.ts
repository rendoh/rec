import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 20px',
});

export const date = style({
  fontSize: 20,
  margin: '0 25px',
  fontWeight: 700,
  letterSpacing: '.05em',
});
