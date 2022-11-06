import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
});

export const content = style({
  padding: 12,
  flex: 1,
  overflowY: 'auto',
  position: 'relative',
});

export const footer = style({
  boxShadow: '0 0px 6px rgba(0, 0, 0, .05)',
  zIndex: 1,
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
  marginBottom: 12,
});

export const dialogContent = style({
  padding: '10px 30px 0',
  marginBottom: -10,
});
