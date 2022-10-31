import { Classes } from '@blueprintjs/core';
import { globalStyle } from '@vanilla-extract/css';

globalStyle(`body:not(.${Classes.DARK})`, {
  background: '#edeff2',
});
