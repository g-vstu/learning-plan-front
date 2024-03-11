import React from 'react';
import { TableCell } from '@mui/material';

export const VerticalTableCell: React.FC = ({ children }) => {
    return (
        <>
            <TableCell
                id="TableCell"
                style={{
                    textOrientation: 'mixed',
                    writingMode: 'vertical-lr',
                    width: 50,
                    borderCollapse: 'unset',
                    transform: 'rotate(180deg)',
                    textAlign: 'center',
                }}
            >
                {children}
            </TableCell>
        </>
    );
};
