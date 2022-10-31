import { Classes } from '@blueprintjs/core';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({});
export const interactiveOutline = style({});

globalStyle(`${root} .${Classes.INPUT}`, {
  fontSize: '20px !important',
  fontWeight: 'bold',
  letterSpacing: '.05em',
});

globalStyle(`${interactiveOutline} .${Classes.INPUT}:not(:hover):not(:focus)`, {
  boxShadow: 'none',
  background: 'inherit',
});
