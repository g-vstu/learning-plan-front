import React from 'react';
import './App.css';

function App() {
    const handleClick = async () => {
        const response = await fetch('http://localhost:8080/speciality');
        const data = await response.json();
        console.log(data);
    };
    return (
        <>
            <div>Hi App</div>
        </>
    );
}

export default App;
