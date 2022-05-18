import React from 'react';
import { TableCell } from '@mui/material';

export const VerticalTableCell: React.FC = ({ children }) => {
    return (
        <>
            <TableCell
                style={{
                    textOrientation: 'mixed',
                    writingMode: 'vertical-lr',
                    width: 50,
                }}
            >
                {children}
            </TableCell>
        </>
    );
};
