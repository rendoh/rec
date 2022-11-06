import { Classes } from '@blueprintjs/core';
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  backgroundColor: vars.color.neutralLighter,
  padding: 12,
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

export const formGroup = style({
  margin: 0,
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
  fontSize: 18,
  margin: '0 8px',
});

export const detailRow = style([
  row,
  {
    marginTop: 10,
  },
]);

globalStyle(`${detailRow} .${Classes.FORM_GROUP}`, {
  margin: '0',
});

export const dateTimeControlGroup = style({
  alignItems: 'center',
});

export const tilde = style({
  margin: '0 5px',
});
