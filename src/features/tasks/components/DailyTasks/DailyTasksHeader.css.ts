import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  background: vars.color.neutralLighter,
  display: 'grid',
  gridTemplate: '"today center theme" 1fr / 1fr 5fr 1fr',
  justifyContent: 'space-between',
  padding: 10,
});

export const center = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // placeItems: 'center',
  gap: 5,
  gridArea: 'center',
});

export const date = style({
  margin: '0 15px',
  letterSpacing: '.05em',
});

export const today = style({
  gridArea: 'today',
});
