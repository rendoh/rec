import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const root = style({
  borderRadius: '50%',
  background: vars.color.neutralLighter,
  aspectRatio: '1',
  display: 'inline-grid',
  placeItems: 'center',
  flexShrink: 0,
  lineHeight: 1,
  width: '2em',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      background: vars.color.neutralLight,
    },
  },
});

globalStyle(`${root} > *`, {
  width: '1em',
  color: 'currentcolor',
});
