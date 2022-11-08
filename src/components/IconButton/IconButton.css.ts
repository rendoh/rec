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
    ':hover': {
      background: vars.color.neutralLight,
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

globalStyle(`${root()} > *`, {
  width: '0.9em',
  color: 'currentcolor',
});
