import { ThemeProvider } from 'config/layout/theme';
import React from 'react';

const App: React.FC = ({ children }) => {
    return <ThemeProvider>{children}</ThemeProvider>;
};

export default App;
