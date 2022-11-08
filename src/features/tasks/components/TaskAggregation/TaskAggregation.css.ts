import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  margin: 0,
});

export const row = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 10,
  padding: '12px 0',
  selectors: {
    '& + &': {
      borderTop: `1px solid ${vars.color.neutral}`,
    },
  },
});

export const title = style({
  flexGrow: 1,
  margin: 0,
});

export const time = style({
  flexShrink: 0,
  margin: 0,
});
