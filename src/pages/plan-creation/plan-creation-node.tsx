import React, { useEffect, useState } from 'react';
import { IconButton, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { Node, Plan, Semester } from 'types';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { TableEditCell } from './plan-creation-table/table-edit-cell';
import { PlanCreationSemester } from './plan-creation-semester';

interface PropTypes {
    node: Node;
    semesters: Semester[];
    plans: Plan[];
}

export const PlanCreationNode: React.FC<PropTypes> = ({ node, semesters, plans }) => {
    const associatedSemesters = semesters
        ?.filter((semester) => semester?.idNode?.idNode === node?.idNode)
        .sort((firstSeminar, secondSeminar) => firstSeminar?.number - secondSeminar?.number);

    const associatedPlan = plans?.find((plan) => plan?.id === node?.idPlan?.id);

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

    return (
        <TableRow key={node?.idNode}>
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

            <TableCell>
                {associatedSemesters?.map((semester) => (
                    <PlanCreationSemester key={semester?.id} semester={semester} />
                ))}
            </TableCell>
        </TableRow>
    );
};
