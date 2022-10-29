import { globalStyle, style } from '@vanilla-extract/css';

export const invalidTimePicker = style({});

globalStyle(`${invalidTimePicker} .bp4-timepicker-input-row`, {
  boxShadow:
    '0 0 0 0 rgba(205, 66, 70, 0), 0 0 0 0 rgba(205, 66, 70, 0), inset 0 0 0 1px #cd4246, inset 0 0 0 1px rgba(17, 20, 24, 0.2), inset 0 1px 1px rgba(17, 20, 24, 0.5)',
});
globalStyle(`${invalidTimePicker} .bp4-timepicker-input-row:focus-within`, {
  boxShadow:
    'inset 0 0 0 1px #cd4246, 0 0 0 2px rgba(205, 66, 70, 0.3), inset 0 1px 1px rgba(17, 20, 24, 0.2)',
});

export const tilde = style({
  alignSelf: 'center',
});
