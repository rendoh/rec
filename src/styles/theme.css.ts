import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    primary: '',
    // primaryLight: '',
    // primaryDark: '',
    // neutralPrimary: '',
    // neutralSecondary: '',
    // neutralTertiary: '',
    neutral: '',
    neutralLight: '',
    neutralLighter: '',
    black: '',
    white: '',
  },
});

export const lightThemeClass = createTheme(vars, {
  color: {
    primary: '#7d3fe8',
    // primaryLight: '#d6c2f8',
    // primaryDark: '#5f30b0',
    // neutralPrimary: '#000000',
    // neutralSecondary: '#373737',
    // neutralTertiary: '#595959',
    neutral: '#ccc',
    neutralLight: '#e8e8e8',
    neutralLighter: '#f1f1f1',
    black: '#2d2d2d',
    white: '#fafafa',
  },
});
