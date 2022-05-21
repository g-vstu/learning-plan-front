import { TableCell, TableRow } from '@mui/material';
import React from 'react';

export const TableSemesterCell: React.FC<any> = ({ semesterWeek }) => {
    return (
        <>
            <TableCell align="center">{semesterWeek?.semsteerNumber} семестр</TableCell>
        </>
    );
};
