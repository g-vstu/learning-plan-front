import React, { useMemo } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { hover } from '@testing-library/user-event/dist/hover';

export const theme = createTheme({
    typography: {
        fontFamily: 'DM Sans', //This font is only for initial theme testing
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    border: '1px solid black',
                    padding: 8,
                    fontSize: 12,
                    '&:hover': {
                        //backgroundColor: '#80deea',
                    },
                },
            },
        },

        MuiContainer: {
            styleOverrides: {
                root: {
                    minWidth: '90%',
                    marginTop: 30,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
    },
});

export type ThemeType = typeof theme;

export const ThemeProvider: React.FC = ({ children }) => {
    const themeWithLocale = useMemo(() => createTheme(theme), [theme]);

    return (
        <MUIThemeProvider theme={themeWithLocale}>
            <CssBaseline />
            <Container>{children}</Container>
        </MUIThemeProvider>
    );
};
