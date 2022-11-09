import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../styles/theme.css';

export const glassButton = recipe({
  base: {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, .05)',
    borderRadius: 4,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    letterSpacing: '.05em',
    border: '1px solid rgba(255, 255, 255, .055)',
    borderTopColor: 'rgba(255, 255, 255, .15)',
    borderBottomColor: 'rgba(128, 128, 128, .025)',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, .085)',
    },
    ':disabled': {
      opacity: 0.7,
      pointerEvents: 'none',
      color: 'rgba(255, 255, 255, .3)',
      borderColor: 'transparent',
    },
    ':active': {
      borderColor: 'rgba(255, 255, 255, .055)',
    },
  },
  variants: {
    size: {
      large: {
        gap: 8,
        padding: '10px 12px',
      },
      normal: {
        gap: 5,
        padding: '3px 8px',
        fontSize: 12,
      },
    },

    selected: {
      true: {
        background: '#fff',
        color: vars.color.primary,
        pointerEvents: 'none',
        ':hover': {
          background: '#f1f1f1',
        },
      },
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

export type GlassButtonVariants = RecipeVariants<typeof glassButton>;
