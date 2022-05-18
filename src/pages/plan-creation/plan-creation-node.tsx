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

interface PropTypes {
    node: Node;
    semesters: Semester[];
    plans: Plan[];
}

export const PlanCreationNode: React.FC<PropTypes> = ({ node, semesters, plans }) => {
    const dispatch = useDispatch();
    const associatedSemesters = semesters
        ?.filter((semester) => semester?.idNode?.idNode === node?.idNode)
        .sort((firstSeminar, secondSeminar) => firstSeminar?.number - secondSeminar?.number);

    const associatedPlan = plans?.find((plan) => plan?.id === node?.idPlan?.id);

    const maxNumber = associatedSemesters.length;

    const [totalWorks, setTotalWorks] = useState({
        totalExams: 0,
        totalTests: 0,
        totalRgrs: 0,
    });

    const [totalCourseHours, setCourseHours] = useState({
        totalClass: 0,
        totalAuditore: 0,
        totalLecture: 0,
        totalLab: 0,
        totalPractice: 0,
        totalSeminar: 0,
    });

    const hnadleCreateNewSemester = () => {
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

    return (
        <TableRow>
            <TableCell>{node?.nodeNumber}</TableCell>
            <TableCell>{node?.idSubject?.name}</TableCell>
            <TableCell>{totalWorks?.totalExams}</TableCell>
            <TableCell>{totalWorks?.totalTests}</TableCell>
            <TableCell>{totalWorks?.totalRgrs}</TableCell>

            <TableCell padding="none">{totalCourseHours?.totalClass}</TableCell>
            <TableCell padding="none">{totalCourseHours?.totalAuditore}</TableCell>

            <TableCell>{totalCourseHours?.totalLecture}</TableCell>
            <TableCell>{totalCourseHours?.totalLab}</TableCell>
            <TableCell>{totalCourseHours?.totalPractice}</TableCell>
            <TableCell>{totalCourseHours?.totalSeminar}</TableCell>

            {associatedSemesters?.map((semester) => (
                <PlanCreationSemester key={semester?.id} semester={semester} />
            ))}
            <TableCell>
                <IconButton onClick={hnadleCreateNewSemester}>
                    <AddIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};
