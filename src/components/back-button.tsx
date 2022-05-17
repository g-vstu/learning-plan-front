import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

export const BackButton: React.FC<any> = (props) => {
    return (
        <Button
            {...props}
            variant="contained"
            startIcon={<ArrowBackIcon style={{ width: 25, height: 25, color: 'black' }} />}
            style={{
                width: 140,
                backgroundColor: 'transparent',
                color: 'black',
                border: '1px solid black',
            }}
        >
            Back
        </Button>
    );
};
