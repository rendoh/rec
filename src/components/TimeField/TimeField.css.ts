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
    backgroundColor: vars.color.neutralLight,
    padding: '6px 12px',
  },

  variants: {
    error: {
      true: {
        borderColor: vars.color.error,
      },
      false: {
        selectors: {
          '&:focus-within': {
            borderColor: vars.color.neutral,
          },
        },
      },
    },
  },
});

export type RootVariants = RecipeVariants<typeof root>;

export const field = style({
  padding: '2px 5px',
  selectors: {
    '&:focus': {
      background: vars.color.neutral,
      borderRadius: 4,
      outline: 'none',
    },
  },
});