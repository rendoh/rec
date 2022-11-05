import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('body', {
  fontFamily:
    '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  background: vars.color.white,
  color: vars.color.black,
  lineHeight: 1.5,
  fontSize: 14,
});

globalStyle('*', {
  outline: 'revert',
});
