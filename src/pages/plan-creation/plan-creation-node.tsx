import React, { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Node, Plan, Semester } from 'types';

interface PropTypes {
    node: Node;
    semesters: Semester[];
    plans: Plan[];
}

export const PlanCreationNode: React.FC<PropTypes> = ({ node, semesters, plans }) => {
    const associatedSemesters = semesters?.filter(
        (semester) => semester?.idNode?.idNode === node?.idNode
    );

    const associatedPlan = plans?.find((plan) => plan?.id === node?.idPlan?.id);

    const [totalWorks, setTotalWorks] = useState({
        totalExams: 0,
        totalTests: 0,
        totalRgrs: 0,
    });

    const [totalCourseHours, setCourseHours] = useState({
        totalClass: 0,
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

            <TableCell padding="none">
                <TableCell>Всего</TableCell>
                <TableCell>{totalCourseHours?.totalClass}</TableCell>
                <TableCell>{totalCourseHours?.totalLecture}</TableCell>
                <TableCell>{totalCourseHours?.totalLab}</TableCell>
                <TableCell>{totalCourseHours?.totalPractice}</TableCell>
                <TableCell>{totalCourseHours?.totalSeminar}</TableCell>
            </TableCell>
            <TableCell>
                {associatedSemesters?.map((semester) => (
                    <TableCell key={semester?.id} padding="none">
                        <TableRow>
                            <TableCell>Итог</TableCell>
                            <TableCell>Итог звонки</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{semester?.lecture}</TableCell>
                            <TableCell>{semester?.practice}</TableCell>
                            <TableCell>{semester?.seminar}</TableCell>
                            <TableCell>{semester?.laboratory}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>лк</TableCell>
                            <TableCell>пр</TableCell>
                            <TableCell>сем</TableCell>
                            <TableCell>лб</TableCell>
                        </TableRow>
                    </TableCell>
                ))}
            </TableCell>
        </TableRow>
    );
};
