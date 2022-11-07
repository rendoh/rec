import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const header = style({
  padding: 16,
  borderBottom: `1px solid ${vars.color.neutral}`,
});

export const content = style({
  gridArea: '1 / -1',
  padding: 16,
  flex: 1,
  overflowY: 'auto',
});