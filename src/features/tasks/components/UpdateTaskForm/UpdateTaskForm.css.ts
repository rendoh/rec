import { Classes } from '@blueprintjs/core';
import { globalStyle, style } from '@vanilla-extract/css';

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const headerRow = style([
  row,
  {
    gap: 20,
  },
]);

export const formGroup = style({
  margin: 0,
  flex: 1,
});

export const actions = style([
  row,
  {
    flexShrink: 0,
    gap: 10,
  },
]);

export const elapsedTime = style({
  fontWeight: 'bold',
  fontSize: 20,
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

export const tilde = style({
  alignSelf: 'center',
  margin: '0 5px',
});
