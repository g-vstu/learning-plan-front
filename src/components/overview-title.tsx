import React from 'react';
import { Typography } from '@mui/material';

export const OverviewTitle: React.FC = ({ children }) => {
    return (
        <>
            <Typography variant="h4" fontWeight={700}>
                {children}
            </Typography>
        </>
    );
};
