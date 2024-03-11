import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useCalculateTotalTests } from 'hooks/useCalculateTests';
import { useCalculateTotalParams } from 'hooks/useCalculateTotalParams';
import { GroupComponentName, Semester } from 'types';
import { makeStyles } from '@mui/styles';
import { lightGreen, lime } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { selectGroupComponents } from 'store/group-component/selectors';

interface PropTypes {
    groupComponent: GroupComponentName;
    semesters: Semester[];
}

const useStyles = makeStyles({
    cell: {
        backgroundColor: lightGreen[400],
    },
});

export const PlanCreationOverall: React.FC<PropTypes> = ({ groupComponent, semesters }) => {
    const classes = useStyles();
    const groupComponents = useSelector(selectGroupComponents);
    const associatedComponent = groupComponents.find(
        (component) => component?.name === groupComponent
    );

    const { totalExams, totalTests, totalRgrs } = useCalculateTotalTests(semesters);

    const { totalClass, totalAuditore, totalPractice, totalLecture, totalLab, totalSeminar } =
        useCalculateTotalParams(semesters);

    return (
        <TableRow>
            <TableCell>{associatedComponent?.componentNumber}</TableCell>
            <TableCell style={{ backgroundColor: '#18ffff' }}>{groupComponent}</TableCell>
            <TableCell style={{ backgroundColor: '#18ffff' }}>{totalExams}</TableCell>
            <TableCell style={{ backgroundColor: '#18ffff' }}>{totalTests}</TableCell>
            <TableCell style={{ backgroundColor: '#18ffff' }}>{totalRgrs}</TableCell>

            <TableCell className={classes.cell}>{totalClass}</TableCell>
            <TableCell className={classes.cell}>{totalAuditore}</TableCell>
            <TableCell className={classes.cell}>{totalLecture}</TableCell>
            <TableCell className={classes.cell}>{totalLab}</TableCell>
            <TableCell className={classes.cell}>{totalPractice}</TableCell>
            <TableCell className={classes.cell}>{totalSeminar}</TableCell>
        </TableRow>
    );
};
