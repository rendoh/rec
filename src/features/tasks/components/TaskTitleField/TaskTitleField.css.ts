import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const root = recipe({
  base: {
    width: '100%',
    borderRadius: 4,
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: vars.color.neutralLight,
    padding: '4px 8px',
    outline: 'none',
    border: '1px solid transparent',
    ':focus': {
      fontWeight: 'normal',
    },
    '::placeholder': {
      color: vars.color.neutral,
    },
  },

  variants: {
    error: {
      true: {
        borderColor: vars.color.error,
      },
      false: {
        ':focus': {
          borderColor: vars.color.neutral,
        },
      },
    },
    interactiveOutline: {
      true: {
        selectors: {
          '&:not(:focus):not(:hover)': {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
        },
      },
    },
  },
});

export type RootVariants = RecipeVariants<typeof root>;
