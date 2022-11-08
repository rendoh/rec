import { style } from '@vanilla-extract/css';
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
  background: vars.color.neutralLighter,
  borderTopLeftRadius: 5,
  color: vars.color.neutralDarker,
  overflowY: 'auto',
  position: 'relative',
  '::after': {
    content: '""',
    pointerEvents: 'none',
    display: 'block',
    width: '100%',
    height: '100%',
    boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 5,
    zIndex: 1,
  },
});
