import React from 'react';
import { CircularProgress } from '@mui/material';

export const Loader: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20%',
            }}
        >
            <CircularProgress style={{ width: 60, height: 60 }} />
        </div>
    );
};
