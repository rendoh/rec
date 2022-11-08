import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 50,
  paddingRight: 12,
});

export const controller = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  gridArea: 'center',
});

export const date = style({
  margin: '0 12px',
  letterSpacing: '.05em',
});

export const buttons = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const button = style({
  display: 'inline-flex',
  placeItems: 'center',
  gap: 5,
  cursor: 'pointer',
  padding: 5,
  borderRadius: 4,
  ':hover': {
    background: 'rgba(255, 255, 255, .075)',
  },
});

export const borderButton = style([
  button,
  {
    border: '1px solid rgba(255, 255, 255, .3)',
    padding: '3px 8px',
    ':disabled': {
      opacity: 0.3,
      pointerEvents: 'none',
    },
  },
]);

export const tabSelectors = style({
  display: 'flex',
});

export const tabSelector = recipe({
  base: [
    borderButton,
    {
      borderRadius: 0,
      borderRightWidth: 0,
      ':first-child': {
        borderRadius: '4px 0 0 4px',
      },
      ':last-child': {
        borderRadius: '0 4px 4px 0',
        borderRightWidth: '1px',
      },
    },
  ],

  variants: {
    selected: {
      true: {
        background: '#fff',
        color: vars.color.primary,
        pointerEvents: 'none',
        ':hover': {
          background: vars.color.neutralLight,
        },
      },
    },
  },
});
