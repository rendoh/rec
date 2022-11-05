import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../styles/theme.css';

export const root = recipe({
  base: {
    cursor: 'pointer',
    background: vars.color.neutralLighter,
    borderRadius: 4,
    padding: '5px 10px',
    lineHeight: 1.25,
    selectors: {
      '&:hover': {
        background: vars.color.neutralLight,
      },
      '&:disabled': {
        color: vars.color.neutral,
      },
    },
  },

  variants: {
    border: {
      true: {
        border: `1px solid ${vars.color.neutral}`,
      },
    },
  },
});

export type RootVariants = RecipeVariants<typeof root>;
