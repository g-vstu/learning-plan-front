import React, { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: 'DM Sans', //This font is only for initial theme testing
    },
});

export type ThemeType = typeof theme;

export const ThemeProvider: React.FC = ({ children }) => {
    const themeWithLocale = useMemo(() => createTheme(theme), [theme]);

    return (
        <MUIThemeProvider theme={themeWithLocale}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
};
