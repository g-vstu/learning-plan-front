import React, { useEffect, useState } from 'react';
import {
    IconButton,
    Stack,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { CourseWorkType, Node, Plan, Semester, SemesterType, SemesterWeek } from 'types';
import { PlanCreationSemester } from './plan-creation-semester';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useCalculateTotalParams } from 'hooks/useCalculateTotalParams';
import { useCalculateTotalTests } from 'hooks/useCalculateTests';
import { makeStyles } from '@mui/styles';
import { blue, green, lightGreen, lime, red } from '@mui/material/colors';

import { selectCurrentPlan } from 'store/plan/selectors';
import WarnDialog from '../../components/warn-dialog';
import ConfirmDialog from '../../components/confirm-dialog';
import { useSemestersTotalCalculate } from 'hooks/useSemestersTotalCalculate';

interface PalanSummaryProps {
    semestersWeeks: SemesterWeek[];
    semesters: Semester[];
}

const useStyles = makeStyles({
    cell: {
        backgroundColor: lightGreen[400],
    },
    mainCell: {
        backgroundColor: blue[300],
    },
});

export const PlanSummary: React.FC<PalanSummaryProps> = ({ semestersWeeks, semesters }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentPlan = useSelector(selectCurrentPlan);

    /* const { semestersTotal } = useSemestersTotalCalculate(semesters, semestersWeeks);
    console.log('semestersTota');
    console.log(semestersTotal);
   */
    const { totalClass, totalAuditore, totalPractice, totalLecture, totalLab, totalSeminar } =
        useCalculateTotalParams(semesters);
    const { totalExams, totalTests, totalRgrs, totalZe } = useCalculateTotalTests(semesters);

    const newSemestersTotal = semestersWeeks.map((semesterWeek) => {
        return {
            ze: semesters.reduce((sum, semesterData) => {
                if (semesterWeek.numberSemestr == semesterData.number)
                    return sum + semesterData.ze + semesterData.courceWorkZe;
                else return sum;
            }, 0),
            rgr: semesters.reduce((sum, semesterData) => {
                if (semesterWeek.numberSemestr == semesterData.number)
                    return sum + semesterData.rgr;
                else return sum;
            }, 0),
            exams: semesters.reduce((sum, semesterData) => {
                if (
                    semesterWeek.numberSemestr == semesterData.number &&
                    (semesterData.type == SemesterType.Exam ||
                        semesterData.type == SemesterType.DifTest)
                )
                    return sum + 1;
                else return sum;
            }, 0),
            tests: semesters.reduce((sum, semesterData) => {
                if (
                    semesterWeek.numberSemestr == semesterData.number &&
                    semesterData.type == SemesterType.Test
                )
                    return sum + 1;
                else return sum;
            }, 0),
            auditor: semesters.reduce((sum, semesterData) => {
                if (semesterWeek.numberSemestr == semesterData.number)
                    return (
                        sum +
                        semesterData.lecture +
                        semesterData.laboratory +
                        semesterData.practice +
                        semesterData.seminar
                    );
                else return sum;
            }, 0),
            selfeducation: semesters.reduce((sum, semesterData) => {
                if (semesterWeek.numberSemestr == semesterData.number)
                    return sum + semesterData.selfeducation + semesterData.courceWorkHours;
                else return sum;
            }, 0),
            CourseWorks: semesters.reduce((sum, semesterData) => {
                if (
                    semesterWeek.numberSemestr == semesterData.number &&
                    semesterData.courseWorkType === CourseWorkType.Work
                )
                    return sum + 1;
                else return sum;
            }, 0),
            CourseProjects: semesters.reduce((sum, semesterData) => {
                if (
                    semesterWeek.numberSemestr == semesterData.number &&
                    semesterData.courseWorkType === CourseWorkType.Project
                )
                    return sum + 1;
                else return sum;
            }, 0),
        };
    });

    const CourseProjectsTotal = newSemestersTotal.reduce(
        (sum, semester) => sum + semester.CourseProjects,
        0
    );
    const CourseWorksTotal = newSemestersTotal.reduce(
        (sum, semester) => sum + semester.CourseWorks,
        0
    );

    console.log('semestersTota');
    console.log(newSemestersTotal);

    return (
        <>
            <TableRow>
                <TableCell colSpan={2} align="center" className={classes.mainCell}>
                    <Typography>Количество часов учебных занятий</Typography>
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

                {newSemestersTotal?.map((semesterTotal, i) => {
                    return (
                        <TableCell key={i} align="center">
                            <Table>
                                <TableRow>
                                    <TableCell align="center">
                                        {semesterTotal.auditor + semesterTotal.selfeducation}
                                    </TableCell>
                                    <TableCell className={classes.cell} align="center">
                                        {semesterTotal.auditor}
                                    </TableCell>
                                    <TableCell>{semesterTotal.ze}</TableCell>
                                </TableRow>
                            </Table>
                        </TableCell>
                    );
                })}
                <TableCell align="center" className={classes.cell}>
                    {totalZe}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={2} align="center" className={classes.mainCell}>
                    <Typography>Количество курсовых проектов</Typography>
                </TableCell>
                <TableCell colSpan={9} align="center" className={classes.cell}>
                    {CourseProjectsTotal}
                </TableCell>
                {newSemestersTotal?.map((semesterTotal, i) => {
                    return (
                        <TableCell key={i} align="center">
                            {semesterTotal.CourseProjects}
                        </TableCell>
                    );
                })}
            </TableRow>
            <TableRow>
                <TableCell colSpan={2} align="center" className={classes.mainCell}>
                    <Typography>Количество курсовых работ</Typography>
                </TableCell>
                <TableCell colSpan={9} align="center" className={classes.cell}>
                    {CourseWorksTotal}
                </TableCell>
                {newSemestersTotal?.map((semesterTotal, i) => {
                    return (
                        <TableCell key={i} align="center">
                            {semesterTotal.CourseWorks}
                        </TableCell>
                    );
                })}
            </TableRow>
            <TableRow>
                <TableCell colSpan={2} align="center" className={classes.mainCell}>
                    <Typography>Количество экзаменов</Typography>
                </TableCell>
                <TableCell colSpan={9} align="center" className={classes.cell}>
                    {totalExams}
                </TableCell>
                {newSemestersTotal?.map((semesterTotal, i) => {
                    return (
                        <TableCell key={i} align="center">
                            {semesterTotal.exams}
                        </TableCell>
                    );
                })}
            </TableRow>
            <TableRow>
                <TableCell colSpan={2} align="center" className={classes.mainCell}>
                    <Typography>Количество зачётов</Typography>
                </TableCell>
                <TableCell colSpan={9} align="center" className={classes.cell}>
                    {totalTests}
                </TableCell>
                {newSemestersTotal?.map((semesterTotal, i) => {
                    return (
                        <TableCell key={i} align="center">
                            {semesterTotal.tests}
                        </TableCell>
                    );
                })}
            </TableRow>
        </>
    );
};
