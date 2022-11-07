import { style } from '@vanilla-extract/css';

export const root = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const heading = style({
  height: 50,
  display: 'grid',
  alignItems: 'center',
  padding: '0 12px',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  overflowY: 'auto',
  padding: '0 12px 12px',
});

export const button = style({
  width: '100%',
  color: '#fff',
  backgroundColor: 'rgba(255, 255, 255, .05)',
  padding: '12px 16px',
  borderRadius: 4,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  letterSpacing: '.05em',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .075)',
    },
  },
});

export const playIcon = style({
  fontSize: 18,
  marginBottom: 1,
});
