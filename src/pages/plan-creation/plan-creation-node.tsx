import React, { useState } from 'react';
import { IconButton, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { CourseWorkType, Node, Plan, Semester, SemesterType } from 'types';
import { PlanCreationSemester } from './plan-creation-semester';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { createSemester } from 'store/semester/actions';
import { useCalculateTotalParams } from 'hooks/useCalculateTotalParams';
import { useCalculateTotalTests } from 'hooks/useCalculateTests';
import { makeStyles } from '@mui/styles';
import { blue, lightGreen, lime } from '@mui/material/colors';
import { selectSubCompetencies } from 'store/sub-competence/selectors';
import { AddSemesterDialog } from './plan-creation-add-semester-dialog';
import { PlanCreationSemesterWork } from './plan-creation-semester-work';

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

    const [open, setOpen] = useState(false);

    const associatedSemesters = semesters
        ?.filter((semester) => semester?.idNode?.idNode === node?.idNode)
        .sort((firstSeminar, secondSeminar) => firstSeminar?.number - secondSeminar?.number);

    const associatedPlan = plans?.find((plan) => plan?.id === node?.idPlan?.id);
    const maxNumber = associatedSemesters.length;

    const { totalExams, totalTests, totalRgrs, totalZe } =
        useCalculateTotalTests(associatedSemesters);
    const { totalClass, totalAuditore, totalPractice, totalLecture, totalLab, totalSeminar } =
        useCalculateTotalParams(associatedSemesters);

    const handleCreateNewSemester = () => {
        /*const newSemester: Semester = {
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
        dispatch(createSemester(newSemester, node));*/
        setOpen(true);
    };

    const addSemestersAmount = semestersWeeks?.length - associatedSemesters?.length;
    const emptyWeeksSemesers = semestersWeeks?.slice(semestersWeeks?.length - addSemestersAmount);

    const subCompetencies = useSelector(selectSubCompetencies);
    const associatedCompetence = subCompetencies.find(
        (competence) => competence?.idSubject?.id === node?.idSubject?.id
    );

    return (
        <>
            <AddSemesterDialog open={open} setOpen={setOpen} node={node} maxNumber={maxNumber} />
            <TableRow>
                <TableCell align="center">{node?.nodeNumber}</TableCell>
                <TableCell align="center" className={classes.mainCell}>
                    {node?.idSubject?.name}
                </TableCell>
                <TableCell align="center" className={classes.mainCell}>
                    {totalExams}
                </TableCell>
                <TableCell align="center" className={classes.mainCell}>
                    {totalTests}
                </TableCell>
                <TableCell className={classes.mainCell}>{totalRgrs}</TableCell>

                <TableCell align="center" padding="none" className={classes.cell}>
                    {totalClass}
                </TableCell>
                <TableCell align="center" padding="none" className={classes.cell}>
                    {totalAuditore}
                </TableCell>

                <TableCell align="center" className={classes.cell}>
                    {totalLecture}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                    {totalLab}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                    {totalPractice}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                    {totalSeminar}
                </TableCell>

                {associatedSemesters?.map((semester) => {
                    return (
                        <>
                            {semester?.courseWorkType === CourseWorkType.Project ? (
                                <PlanCreationSemesterWork key={semester?.id} semester={semester} />
                            ) : (
                                <PlanCreationSemester key={semester?.id} semester={semester} />
                            )}
                        </>
                    );
                })}
                {emptyWeeksSemesers?.map((week) => {
                    return (
                        <TableCell align="center" key={week?.id}>
                            {week?.semsteerNumber - 1 === maxNumber ? (
                                <IconButton onClick={() => handleCreateNewSemester()}>
                                    <AddIcon />
                                </IconButton>
                            ) : null}
                        </TableCell>
                    );
                })}
                <TableCell className={classes.cell} align="center">
                    {totalZe}
                </TableCell>
                <TableCell>
                    {associatedCompetence?.idCompetence?.shifrCompetence || 'N/A'}
                </TableCell>
            </TableRow>
        </>
    );
};
