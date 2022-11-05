import { Classes, Colors } from '@blueprintjs/core';
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
});

export const content = style({
  padding: 20,
  flex: 1,
  overflowY: 'auto',
  position: 'relative',
});

export const footer = style({});

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
