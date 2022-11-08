import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const heading = style({
  height: 50,
  display: 'grid',
  alignItems: 'center',
  padding: '0 12px',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  overflowY: 'auto',
  padding: '0 12px 12px',
  flex: 1,
});

export const button = style({
  width: '100%',
  color: '#fff',
  backgroundColor: 'rgba(255, 255, 255, .05)',
  padding: '12px 12px',
  borderRadius: 4,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  letterSpacing: '.05em',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .095)',
    },
  },
});

export const playIcon = style({
  fontSize: 18,
  marginBottom: 1,
  flexShrink: 0,
});

export const themeButton = style({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12,
  margin: 10,
});

const iconSize = 8;

export const switchIcon = recipe({
  base: {
    display: 'block',
    width: 28,
    height: iconSize + 6,
    border: '1px solid currentcolor',
    borderRadius: '100vmax',
    position: 'relative',
    '::before': {
      content: '""',
      display: 'block',
      borderRadius: '50%',
      background: 'currentcolor',
      width: iconSize,
      aspectRatio: '1',
      position: 'absolute',
      top: 2,
      left: 2,
      transition: 'translate 0.2s ease-out',
    },
  },
  variants: {
    selected: {
      true: {
        '::before': {
          translate: '14px 0',
        },
      },
    },
  },
});
