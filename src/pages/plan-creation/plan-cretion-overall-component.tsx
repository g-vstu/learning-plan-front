import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useCalculateTotalTests } from 'hooks/useCalculateTests';
import { useCalculateTotalParams } from 'hooks/useCalculateTotalParams';
import { GroupComponentName, Semester } from 'types';
import { makeStyles } from '@mui/styles';
import { lightGreen, lime } from '@mui/material/colors';

interface PropTypes {
    groupComponent: GroupComponentName;
    semesters: Semester[];
    number: number;
}

const useStyles = makeStyles({
    cell: {
        backgroundColor: lightGreen[400],
    },
});

export const PlanCreationOverall: React.FC<PropTypes> = ({ groupComponent, semesters, number }) => {
    const classes = useStyles();
    const { totalExams, totalTests, totalRgrs } = useCalculateTotalTests(semesters);

    const { totalClass, totalAuditore, totalPractice, totalLecture, totalLab, totalSeminar } =
        useCalculateTotalParams(semesters);

    return (
        <TableRow>
            <TableCell>{number}</TableCell>
            <TableCell>{groupComponent}</TableCell>
            <TableCell>{totalExams}</TableCell>
            <TableCell>{totalTests}</TableCell>
            <TableCell>{totalRgrs}</TableCell>

            <TableCell className={classes.cell}>{totalClass}</TableCell>
            <TableCell className={classes.cell}>{totalAuditore}</TableCell>
            <TableCell className={classes.cell}>{totalLecture}</TableCell>
            <TableCell className={classes.cell}>{totalLab}</TableCell>
            <TableCell className={classes.cell}>{totalPractice}</TableCell>
            <TableCell className={classes.cell}>{totalSeminar}</TableCell>
        </TableRow>
    );
};
