import { globalStyle } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../styles/theme.css';

export const root = recipe({
  base: {
    borderRadius: '50%',
    background: vars.color.neutralLighter,
    aspectRatio: '1',
    display: 'inline-grid',
    placeItems: 'center',
    flexShrink: 0,
    lineHeight: 1,
    width: '2em',
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        background: vars.color.neutralLight,
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

globalStyle(`${root()} > *`, {
  width: '1em',
  color: 'currentcolor',
});
