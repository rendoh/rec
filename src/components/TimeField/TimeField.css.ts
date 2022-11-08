import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../styles/theme.css';

export const root = recipe({
  base: {
    border: '1px solid transparent',
    borderRadius: 4,
    display: 'inline-flex',
    gap: 6,
    width: '100%',
    backgroundColor: vars.color.neutralLighter,
    boxShadow: 'inset 1px 1px 3px rgba(0, 0, 0, .05)',
    padding: '3px 3px',
  },

  variants: {
    error: {
      true: {
        borderColor: vars.color.error,
      },
      false: {
        ':focus-within': {
          borderColor: vars.color.primary,
        },
      },
    },

    interactiveOutline: {
      true: {
        selectors: {
          '&:not(:focus-within):not(:hover)': {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

export type RootVariants = RecipeVariants<typeof root>;

export const field = style({
  padding: '1px 5px',
  ':focus': {
    background: vars.color.primaryLight,
    borderRadius: 4,
    outline: 'none',
    color: '#fff',
  },
});
