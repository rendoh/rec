import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const root = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  display: 'grid',
  placeItems: 'center',
});

export const backdrop = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, .5)',
  zIndex: -1,
});

export const content = style({
  background: vars.color.white,
  minWidth: '50%',
  maxWidth: '80%',
  maxHeight: '80%',
  overflow: 'hidden',
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const close = style({
  position: 'absolute',
  zIndex: 1,
  top: 5,
  right: 5,
  cursor: 'pointer',
  padding: 10,
  selectors: {
    '&:hover': {
      color: vars.color.neutralDark,
    },
  },
});

export const header = style({
  padding: '12px 40px 12px 16px',
  background: vars.color.neutralLighter,
  fontWeight: 'bold',
});

export const body = style({
  padding: '12px 16px',
  overflowY: 'auto',
  flex: 1,
});
