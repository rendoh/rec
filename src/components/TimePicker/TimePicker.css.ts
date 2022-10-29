import { Classes as DateTimeClasses } from '@blueprintjs/datetime';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({});
export const invalid = style({});

globalStyle(
  `${root} .${DateTimeClasses.TIMEPICKER_INPUT_ROW}:not(:hover):not(:focus-within)`,
  {
    boxShadow: 'none',
    background: 'inherit',
  },
);

globalStyle(
  `${invalid} .${DateTimeClasses.TIMEPICKER_INPUT_ROW}:not(:hover):not(:focus-within)`,
  {
    boxShadow:
      '0 0 0 0 rgba(205, 66, 70, 0), 0 0 0 0 rgba(205, 66, 70, 0), inset 0 0 0 1px #cd4246, inset 0 0 0 1px rgba(17, 20, 24, 0.2), inset 0 1px 1px rgba(17, 20, 24, 0.5)',
  },
);

globalStyle(
  `${invalid} .${DateTimeClasses.TIMEPICKER_INPUT_ROW}:focus-within`,
  {
    boxShadow:
      'inset 0 0 0 1px #cd4246, 0 0 0 2px rgba(205, 66, 70, 0.3), inset 0 1px 1px rgba(17, 20, 24, 0.2)',
  },
);
