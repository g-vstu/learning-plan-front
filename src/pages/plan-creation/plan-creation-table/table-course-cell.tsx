import React from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import { VerticalTableCell } from 'components/vertical-cell';

export const TableCourseCell: React.FC<any> = ({ week }) => {
    return (
        <TableCell padding="none">
            <TableRow>
                <TableCell padding="none" colSpan={2} align="center">
                    {week?.course}
                </TableCell>
            </TableRow>
            <TableRow style={{ height: 80 }}>
                <TableCell padding="none" align="center">
                    <Typography variant="subtitle1">
                        {`${week?.startSem} семестр, ${week?.firstNum}
                        недель`}
                    </Typography>
                    <TableRow>
                        <VerticalTableCell>Часов всего</VerticalTableCell>
                        <VerticalTableCell>Ауд. часов</VerticalTableCell>
                        <VerticalTableCell>Зач. единиц</VerticalTableCell>
                    </TableRow>
                </TableCell>

                <TableCell padding="none" align="center">
                    <Typography variant="subtitle1">
                        {`${week?.endSem} семестр, ${week?.firstNum}
                        недель`}
                    </Typography>
                    <TableRow>
                        <VerticalTableCell>Часов всего</VerticalTableCell>
                        <VerticalTableCell>Ауд. часов</VerticalTableCell>
                        <VerticalTableCell>Зач. единиц</VerticalTableCell>
                    </TableRow>
                </TableCell>
            </TableRow>
        </TableCell>
    );
};
