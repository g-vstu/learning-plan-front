import React, { useEffect, useState } from 'react';
import { IconButton, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { Node, Plan, Semester, SemesterType } from 'types';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { TableEditCell } from './plan-creation-table/table-edit-cell';
import { PlanCreationSemester } from './plan-creation-semester';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { createSemester } from 'store/semester/actions';
import { useCalculateTotalParams } from 'hooks/useCalculateTotalParams';
import { useCalculateTotalTests } from 'hooks/useCalculateTests';
import { makeStyles } from '@mui/styles';
import { blue, lightGreen, lime } from '@mui/material/colors';

interface PropTypes {
    node: Node;
    semesters: Semester[];
    plans: Plan[];
    semestersWeeks: any;
}

const useStyles = makeStyles({
    cell: {
        backgroundColor: lightGreen[400],
    },
    mainCell: {
        backgroundColor: blue[300],
    },
});

export const PlanCreationNode: React.FC<PropTypes> = ({
    node,
    semesters,
    plans,
    semestersWeeks,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const associatedSemesters = semesters
        ?.filter((semester) => semester?.idNode?.idNode === node?.idNode)
        .sort((firstSeminar, secondSeminar) => firstSeminar?.number - secondSeminar?.number);

    const associatedPlan = plans?.find((plan) => plan?.id === node?.idPlan?.id);
    const maxNumber = associatedSemesters.length;

    const { totalExams, totalTests, totalRgrs } = useCalculateTotalTests(associatedSemesters);
    const { totalClass, totalAuditore, totalPractice, totalLecture, totalLab, totalSeminar } =
        useCalculateTotalParams(associatedSemesters);

    const handleCreateNewSemester = () => {
        const newSemester: Semester = {
            courceWorkHours: 0,
            courceWorkZe: 0,
            courseWorkType: null,
            laboratory: 0,
            lecture: 0,
            number: maxNumber + 1,
            practice: 0,
            rgr: 0,
            selfeducation: 0,
            seminar: 0,
            type: SemesterType.Test,
            ze: 0,
        };
        dispatch(createSemester(newSemester, node));
    };

    const addSemestersAmount = semestersWeeks?.length - associatedSemesters?.length;
    const emptyWeeksSemesers = semestersWeeks?.slice(semestersWeeks?.length - addSemestersAmount);

    return (
        <TableRow>
            <TableCell>{node?.nodeNumber}</TableCell>
            <TableCell className={classes.mainCell}>{node?.idSubject?.name}</TableCell>
            <TableCell className={classes.mainCell}>{totalExams}</TableCell>
            <TableCell className={classes.mainCell}>{totalTests}</TableCell>
            <TableCell className={classes.mainCell}>{totalRgrs}</TableCell>

            <TableCell padding="none" className={classes.cell}>
                {totalClass}
            </TableCell>
            <TableCell padding="none" className={classes.cell}>
                {totalAuditore}
            </TableCell>

            <TableCell className={classes.cell}>{totalLecture}</TableCell>
            <TableCell className={classes.cell}>{totalLab}</TableCell>
            <TableCell className={classes.cell}>{totalPractice}</TableCell>
            <TableCell className={classes.cell}>{totalSeminar}</TableCell>

            {associatedSemesters?.map((semester) => (
                <PlanCreationSemester key={semester?.id} semester={semester} />
            ))}
            {emptyWeeksSemesers?.map((week) => {
                //debugger;
                console.log(maxNumber);
                console.log(week?.semsteerNumber);
                return (
                    <TableCell key={week?.id}>
                        {week?.semsteerNumber - 1 === maxNumber ? (
                            <IconButton onClick={() => handleCreateNewSemester()}>
                                <AddIcon />
                            </IconButton>
                        ) : null}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};
