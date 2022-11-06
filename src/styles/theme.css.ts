import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    primary: '',
    // primaryLight: '',
    // primaryDark: '',
    // neutralPrimary: '',
    // neutralSecondary: '',
    // neutralTertiary: '',
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
    primary: '#7d3fe8',
    // primaryLight: '#d6c2f8',
    // primaryDark: '#5f30b0',
    // neutralPrimary: '#000000',
    // neutralSecondary: '#373737',
    // neutralTertiary: '#595959',
    neutralDarker: '#444',
    neutralDark: '#7c7c7c',
    neutral: '#ccc',
    neutralLight: '#e8e8e8',
    neutralLighter: '#f2f2f2',
    black: '#2d2d2d',
    white: '#fafafa',
    error: '#e57373',
    errorDark: '#d46666',
  },
});
