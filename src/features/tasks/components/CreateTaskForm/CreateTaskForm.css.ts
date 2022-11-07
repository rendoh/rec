import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  display: 'flex',
  width: '100%',
  ':focus-within': {
    borderColor: vars.color.primary,
  },
});

export const input = style({
  flex: 1,
  width: 'calc(100% - 20px)',
  padding: '5px 12px',
  outline: 'none',
  backgroundColor: '#fff',
  borderRadius: '4px 0 0 4px',
  border: `1px solid ${vars.color.neutral}`,
  borderRight: 'none',
  ':focus': {
    borderColor: vars.color.primary,
  },
  selectors: {
    '&::placeholder': {
      color: vars.color.neutral,
    },
  },
});

export const button = style({
  flexShrink: 0,

  display: 'grid',
  placeItems: 'center',
  width: 40,
  height: 40,
  fontSize: 20,
  borderRadius: '0 4px 4px 0',
  background: vars.color.primary,
  color: '#fff',
  cursor: 'pointer',
  selectors: {
    '&:not(:disabled):hover': {
      background: vars.color.primaryLight,
    },
  },
});
