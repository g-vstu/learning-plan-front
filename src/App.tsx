import React from 'react';
import './App.css';

const App: React.FC = ({ children }) => {
    return (
        <>
            <div>Hi app</div>
            {children}
        </>
    );
};

export default App;
