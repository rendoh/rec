import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  display: 'grid',
  gridTemplate: `
    "sidebar header " auto
    "sidebar content" 1fr / 200px 1fr
  `,
  height: '100vh',
  background: `linear-gradient(to right bottom, ${vars.color.primaryDark}, ${vars.color.primaryLight})`,
  color: '#fff',
});

export const header = style({
  gridArea: 'header',
});

export const sidebar = style({
  gridArea: 'sidebar',
});

export const content = style({
  gridArea: 'content',
  background: '#f1f1f1', // TODO: use vars
  boxShadow: 'inset 3px 3px 5px rgba(0, 0, 0, 0.25)',
  borderTopLeftRadius: 5,
  color: '#333', // TODO: use vars
  overflowY: 'auto',
});

export const footer = style({
  boxShadow: '0 0px 6px rgba(0, 0, 0, .05)',
  zIndex: 1,
});

export const empty = style({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  paddingBottom: 15,
});

export const emptyIcon = style({
  fontSize: 60,
  marginBottom: 16,
  color: vars.color.neutralDark,
});

export const emptyHeading = style({
  fontSize: 16,
  fontWeight: 'bold',
  color: vars.color.neutralDark,
});

export const emptyText = style({
  fontSize: 12,
  marginTop: 4,
  color: vars.color.neutralDark,
});

export const spinnerWrapper = style({
  width: '100%',
  height: '100%',
  display: 'grid',
  placeItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  background: 'rgba(128, 128, 128, .1)',
  zIndex: 1,
});

const scale = keyframes({
  '0%': {
    scale: 0.2,
    opacity: 0,
  },
  '50%': {
    opacity: 1,
  },
  '100%': {
    scale: 1,
    opacity: 0,
  },
});

export const spinner = style({
  display: 'block',
  width: 50,
  aspectRatio: '1',
  border: `4px solid ${vars.color.neutralDark}`,
  borderRadius: '50%',
  animation: `${scale} 1s infinite`,
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
