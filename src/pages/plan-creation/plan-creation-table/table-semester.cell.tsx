import { TableCell, TableRow } from '@mui/material';
import React from 'react';

export const TableSemesterCell: React.FC<any> = ({ semesterWeek }) => {
    return (
        <>
            <TableCell>{semesterWeek?.semsteerNumber} семестр</TableCell>
        </>
    );
};
