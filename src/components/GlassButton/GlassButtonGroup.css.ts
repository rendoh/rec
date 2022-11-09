import { globalStyle, style } from '@vanilla-extract/css';

export const group = style({
  display: 'flex',
});

globalStyle(`${group} *`, {
  borderRadius: 0,
  borderRightWidth: 0,
});

globalStyle(`${group} > *:first-child`, {
  borderRadius: '4px 0 0 4px',
});

globalStyle(`${group} > *:last-child`, {
  borderRadius: '0 4px 4px 0',
  borderRightWidth: '1px',
});
