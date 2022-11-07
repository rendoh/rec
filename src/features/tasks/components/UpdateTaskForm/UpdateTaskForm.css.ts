import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const root = style({
  backgroundColor: vars.color.white,
  padding: 8,
  borderRadius: 4,
  boxShadow: '0 2px 4px rgba(0, 0, 0, .03)',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const headerRow = style([
  row,
  {
    gap: 12,
    alignItems: 'flex-start',
  },
]);

export const titleField = style({
  flex: 1,
});

export const actions = style([
  row,
  {
    flexShrink: '0',
    gap: 10,
    marginTop: 3,
  },
]);

export const elapsedTime = style({
  fontWeight: 'bold',
  fontSize: 16,
  margin: '0 4px',
  letterSpacing: '.03em',
});

export const detailRow = style([
  row,
  {
    marginTop: 4,
  },
]);

export const range = style([
  row,
  {
    gap: 5,
  },
]);

export const deletePopoverContainer = style({
  position: 'relative',
});

export const deletePopover = style({
  position: 'absolute',
  top: 'calc(100% + 10px)',
  right: 0,
  background: vars.color.white,
  padding: '4px 4px',
  gap: 4,
  boxShadow: '0 0 6px rgba(0, 0, 0, .1)',
  borderRadius: 4,
  display: 'flex',
});

globalStyle(`${deletePopover} > *`, {
  width: 'fit-content',
  whiteSpace: 'nowrap',
});
