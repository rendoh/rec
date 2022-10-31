import { Classes, Colors } from '@blueprintjs/core';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({
  margin: 0,
});

export const row = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 15,
  padding: '15px 0',
  selectors: {
    '& + &': {
      borderTop: `1px solid ${Colors.LIGHT_GRAY1}`,
    },
  },
});

globalStyle(`.${Classes.DARK} ${row}`, {
  borderColor: Colors.GRAY1,
});

export const title = style({
  flexGrow: 1,
  margin: 0,
});

export const time = style({
  flexShrink: 0,
  margin: 0,
});
