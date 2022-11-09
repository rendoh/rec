import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../styles/theme.css';

export const root = recipe({
  base: {
    borderRadius: '50%',
    display: 'inline-grid',
    placeItems: 'center',
    flexShrink: 0,
    lineHeight: 1,
    width: '2em',
    height: '2em',
    cursor: 'pointer',
    fontSize: '0.8em',
  },

  variants: {
    border: {
      true: {
        border: `1px solid ${vars.color.neutralLight}`,
        ':hover': {
          borderColor: vars.color.neutral,
        },
      },
    },
    color: {
      primary: {
        background: vars.color.primary,
        color: '#fff',
        ':hover': {
          background: vars.color.primaryLight,
        },
      },
      normal: {
        ':hover': {
          background: vars.color.neutralLight,
        },
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        color: 'primary',
        border: true,
      },
      style: {
        borderColor: vars.color.primary,
        ':hover': {
          borderColor: vars.color.primary,
        },
      },
    },
  ],

  defaultVariants: {
    color: 'normal',
  },
});

export type RootVariants = RecipeVariants<typeof root>;
