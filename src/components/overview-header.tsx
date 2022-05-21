import React from 'react';

export const OverviewHeader: React.FC = ({ children }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
            }}
        >
            {children}
        </div>
    );
};
