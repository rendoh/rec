import { globalStyle } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../styles/theme.css';

export const root = recipe({
  base: {
    borderRadius: '50%',
    display: 'inline-grid',
    placeItems: 'center',
    flexShrink: 0,
    lineHeight: 1,
    width: '1.8em',
    height: '1.8em',
    cursor: 'pointer',
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

globalStyle(`${root()} > *`, {
  width: '0.9em',
  color: 'currentcolor',
});
