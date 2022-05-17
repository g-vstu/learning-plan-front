import React from 'react';

export const DetailsNavigationContainer: React.FC = ({ children }) => {
    return (
        <div
            style={{
                marginBottom: 25,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            {children}
        </div>
    );
};
