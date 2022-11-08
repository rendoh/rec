import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const root = recipe({
  base: {
    backgroundColor: vars.color.white,
    padding: 8,
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, .03)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'background-color .2s ease-out',
  },
  variants: {
    active: {
      true: {
        '::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 4,
          background: `linear-gradient(to right bottom, ${vars.color.primaryDark}, ${vars.color.primaryLight})`,
        },
      },
    },
  },
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const headerRow = style([
  row,
  {
    gap: 12,
    alignItems: 'flex-start',
  },
]);

export const titleField = style({
  flex: 1,
});

export const actions = style([
  row,
  {
    flexShrink: '0',
    gap: 10,
    marginTop: 3,
  },
]);

export const elapsedTime = recipe({
  base: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: '0 4px',
    letterSpacing: '.03em',
  },
  variants: {
    active: {
      true: {
        color: vars.color.primary,
      },
    },
  },
});

export const detailRow = style([
  row,
  {
    marginTop: 4,
  },
]);

export const range = style([
  row,
  {
    gap: 5,
  },
]);

export const deletePopoverContainer = style({
  position: 'relative',
});

export const deletePopover = style({
  position: 'absolute',
  borderRadius: 4,
  background: vars.color.white,
  top: 'calc(100% + 7px)',
  right: 0,
  boxShadow: '0 4px 4px rgba(0, 0, 0, .1)',
  display: 'flex',
});

export const smallButton = recipe({
  base: {
    background: vars.color.white,
    fontSize: 13,
    padding: '3px 8px',
    cursor: 'pointer',
    color: vars.color.primary,
    border: `1px solid ${vars.color.primary}`,
    ':hover': {
      background: vars.color.neutralLight,
    },
    ':first-of-type': {
      borderRadius: '4px 0 0 4px',
      borderRight: 'none',
    },
    ':last-of-type': {
      borderRadius: '0 4px 4px 0',
    },
  },

  variants: {
    primary: {
      true: {
        background: vars.color.primary,
        color: '#fff',
        ':hover': {
          background: vars.color.primaryLight,
        },
      },
    },
  },
});

globalStyle(`${deletePopover} > *`, {
  width: 'fit-content',
  whiteSpace: 'nowrap',
});
