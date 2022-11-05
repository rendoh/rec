import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const root = recipe({
  base: {
    width: '100%',
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: vars.color.neutralLight,
    padding: '6px 12px',
    outline: 'none',
    border: '1px solid transparent',
    selectors: {
      '&::placeholder': {
        color: vars.color.neutral,
      },
    },
  },

  variants: {
    error: {
      true: {
        borderColor: vars.color.error,
      },
      false: {
        selectors: {
          '&:focus': {
            borderColor: vars.color.neutral,
          },
        },
      },
    },
  },
});

export type RootVariants = RecipeVariants<typeof root>;
