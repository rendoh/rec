import { Classes, Colors } from '@blueprintjs/core';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
});

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 60,
  position: 'relative',
});

globalStyle(`${header}.${Classes.CARD}`, {
  boxShadow: 'none',
  borderBottom: `1px solid ${Colors.LIGHT_GRAY1}`,
});

globalStyle(`.${Classes.DARK} ${header}.${Classes.CARD}`, {
  borderBottomColor: Colors.GRAY1,
});

export const content = style({
  padding: 20,
  flex: 1,
  overflowY: 'auto',
  position: 'relative',
});

export const footer = style({});

export const date = style({
  fontSize: 16,
  margin: '0 25px',
  fontWeight: 700,
  letterSpacing: '.02em',
});

export const todayButton = style({
  position: 'absolute',
  left: 20,
  '@media': {
    '(max-width: 480px)': {
      display: 'none',
    },
  },
});

export const themeGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 20,
  '@media': {
    '(max-width: 480px)': {
      display: 'none',
    },
  },
});

export const themeSwitch = style({
  margin: '2px 0 0 10px',
});

globalStyle(`${themeSwitch} input:checked ~ .${Classes.CONTROL_INDICATOR}`, {
  background: '#ccc !important',
});

export const monthMoveButton = style({
  '@media': {
    '(max-width: 580px)': {
      display: 'none',
    },
  },
});

export const empty = style({
  height: '100%',
});

export const spinnerWrapper = style({
  width: '100%',
  height: '100%',
  display: 'grid',
  placeItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  background: 'rgba(128, 128, 128, .2)',
});

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: 20,
});

export const dialogContent = style({
  padding: '10px 30px 0',
  marginBottom: -10,
});
