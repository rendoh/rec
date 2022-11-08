import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    primary: '',
    primaryLight: '',
    primaryDark: '',
    neutralDarker: '',
    neutralDark: '',
    neutral: '',
    neutralLight: '',
    neutralLighter: '',
    black: '',
    white: '',
    error: '',
    errorDark: '',
  },
});

export const lightThemeClass = createTheme(vars, {
  color: {
    primary: '#456b89',
    primaryLight: '#507da0',
    primaryDark: '#253a4b',
    neutralDarker: '#333',
    neutralDark: '#7c7c7c',
    neutral: '#ccc',
    neutralLight: '#e8e8e8',
    neutralLighter: '#f1f1f1',
    black: '#2d2d2d',
    white: '#fafafa',
    error: '#d95b5b',
    errorDark: '#c74a4a',
  },
});
