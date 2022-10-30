import { Classes, Colors } from '@blueprintjs/core';
import { globalStyle, style } from '@vanilla-extract/css';

const headerHeight = 60;

export const root = style({
  paddingTop: headerHeight + 20,
  paddingBottom: 20,
});

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: headerHeight,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 2,
});

globalStyle(`${header}.${Classes.CARD}`, {
  boxShadow: 'none',
  borderBottom: `1px solid ${Colors.LIGHT_GRAY1}`,
});

globalStyle(`.${Classes.DARK} ${header}.${Classes.CARD}`, {
  borderBottomColor: Colors.GRAY1,
});

export const date = style({
  fontSize: 20,
  margin: '0 25px',
  fontWeight: 700,
  letterSpacing: '.05em',
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
