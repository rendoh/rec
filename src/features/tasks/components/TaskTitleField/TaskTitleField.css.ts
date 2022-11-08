import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const root = recipe({
  base: {
    width: '100%',
    borderRadius: 4,
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: vars.color.neutralLighter,
    boxShadow: 'inset 1px 1px 3px rgba(0, 0, 0, .05)',
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
          borderColor: vars.color.primary,
        },
      },
    },
    interactiveOutline: {
      true: {
        selectors: {
          '&:not(:focus):not(:hover)': {
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
