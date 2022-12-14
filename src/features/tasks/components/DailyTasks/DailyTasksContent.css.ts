import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const header = style({
  padding: 20,
  borderBottom: `1px solid ${vars.color.neutral}`,
});

export const content = style({
  gridArea: '1 / -1',
  padding: 20,
  flex: 1,
  overflowY: 'auto',
});

export const empty = style({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  paddingBottom: 28,
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
