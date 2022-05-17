import React, { useState } from 'react';
import { IconButton, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { Node, Plan, Semester } from 'types';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { TableEditCell } from './plan-creation-table/table-edit-cell';

interface PropTypes {
    node: Node;
    semesters: Semester[];
    plans: Plan[];
}

export const PlanCreationNode: React.FC<PropTypes> = ({ node, semesters, plans }) => {
    const [editMode, setEditMode] = useState(false);

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
            <TableCell>
                {editMode ? (
                    <>
                        <IconButton>
                            <DoneIcon />
                        </IconButton>
                        <IconButton onClick={() => setEditMode(false)}>
                            <DoDisturbIcon />
                        </IconButton>
                    </>
                ) : (
                    <IconButton onClick={() => setEditMode(true)}>
                        <EditIcon />
                    </IconButton>
                )}
            </TableCell>
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
                            <TableCell colSpan={3}>Итог звонки</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableEditCell
                                editMode={editMode}
                                name="lecture"
                                value={semester?.lecture}
                            />
                            <TableEditCell
                                editMode={editMode}
                                name="practice"
                                value={semester?.practice}
                            />
                            <TableEditCell
                                editMode={editMode}
                                name="seminar"
                                value={semester?.seminar}
                            />
                            <TableEditCell
                                editMode={editMode}
                                name="laboratory"
                                value={semester?.laboratory}
                            />
                        </TableRow>
                        <TableRow style={{ padding: 0 }}>
                            <TableCell padding="none">лк</TableCell>
                            <TableCell padding="none">пр</TableCell>
                            <TableCell padding="none">сем</TableCell>
                            <TableCell padding="none">лб</TableCell>
                        </TableRow>
                    </TableCell>
                ))}
            </TableCell>
        </TableRow>
    );
};
