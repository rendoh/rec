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
  boxShadow: 'inset 3px 3px 5px rgba(0, 0, 0, 0.25)',
  borderTopLeftRadius: 5,
  color: vars.color.neutralDarker,
  overflowY: 'auto',
});
