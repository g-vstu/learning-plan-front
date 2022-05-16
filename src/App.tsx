import { ThemeProvider } from 'config/layout/theme';
import React from 'react';
import './App.css';

const App: React.FC = ({ children }) => {
    return <ThemeProvider>{children}</ThemeProvider>;
};

export default App;
