import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const root = style({
  color: vars.color.error,
  marginTop: 8,
  fontSize: 12,
});
