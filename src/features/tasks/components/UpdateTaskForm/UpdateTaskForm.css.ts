import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  backgroundColor: vars.color.neutralLighter,
  padding: 12,
  borderRadius: 4,
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const headerRow = style([
  row,
  {
    gap: 12,
    alignItems: 'flex-start',
  },
]);

export const titleField = style({
  flex: 1,
});

export const actions = style([
  row,
  {
    flexShrink: '0',
    gap: 10,
    marginTop: 3,
  },
]);

export const elapsedTime = style({
  fontWeight: 'bold',
  fontSize: 16,
  margin: '0 4px',
});

export const detailRow = style([
  row,
  {
    marginTop: 4,
  },
]);

export const range = style([
  row,
  {
    gap: 5,
  },
]);
