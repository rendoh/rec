import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  backgroundColor: vars.color.white,
  padding: '16px 20px 4px',
  borderRadius: 4,
  boxShadow: '0 2px 4px rgba(0, 0, 0, .03)',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 8,
});

export const heading = style({
  fontWeight: 'bold',
  fontSize: 15,
});

export const row = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 10,
  padding: '12px 0',
  background: vars.color.white,
  selectors: {
    '& + &': {
      borderTop: `1px solid ${vars.color.neutralLight}`,
    },
  },
});

export const title = style({
  flexGrow: 1,
});

export const time = recipe({
  base: {
    flexShrink: 0,
  },
  variants: {
    active: {
      true: {
        color: vars.color.primary,
        fontWeight: 'bold',
      },
    },
  },
});
