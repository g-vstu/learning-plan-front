import React from 'react';
import { TableCell } from '@mui/material';

export const VerticalTableCell: React.FC = ({ children }) => {
    return (
        <>
            <TableCell style={{ textOrientation: 'mixed', writingMode: 'vertical-lr' }}>
                {children}
            </TableCell>
        </>
    );
};
