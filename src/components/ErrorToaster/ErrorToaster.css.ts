import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const toasterStyle = style({
  fontSize: 12,
  padding: 8,
  vars: {
    '--toastify-color-error': '#00f',
    '--toastify-color-progress-error': vars.color.error,
  },
});

globalStyle(`${toasterStyle} .Toastify__progress-bar`, {
  height: 4,
});

const slideIn = keyframes({
  from: {
    translate: '50% 0',
    opacity: 0,
  },
  to: {
    translate: '0 0',
    opacity: 1,
  },
});

export const enter = style({
  animation: `${slideIn} 0.3s ease-out forwards`,
});

const slideOut = keyframes({
  from: {
    translate: '0 0',
    opacity: 1,
  },
  to: {
    translate: '50% 0',
    opacity: 0,
  },
});

export const exit = style({
  animation: `${slideOut} 0.3s ease-out forwards`,
});

globalStyle('.Toastify__toast-container--top-right', {
  top: 8,
  right: 8,
});
