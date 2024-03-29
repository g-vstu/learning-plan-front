import React, { useEffect, useState } from 'react';
import { IconButton, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { CourseWorkType, Node, Plan, Semester } from 'types';
import { PlanCreationSemester } from './plan-creation-semester';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useCalculateTotalParams } from 'hooks/useCalculateTotalParams';
import { useCalculateTotalTests } from 'hooks/useCalculateTests';
import { makeStyles } from '@mui/styles';
import { blue, green, lightGreen, lime, red } from '@mui/material/colors';
import { selectSubCompetencies } from 'store/sub-competence/selectors';
import { AddSemesterDialog } from './plan-creation-add-semester-dialog';
import { PlanCreationSemesterWork } from './plan-creation-semester-work';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteNode, updateNode } from 'store/node/actions';

import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { selectCurrentPlan } from 'store/plan/selectors';
import { useEditMode } from 'hooks/useEditMode';
import { updateSubject, deleteSubject } from 'store/subject/actions';
import WarnDialog from '../../components/warn-dialog';
import ConfirmDialog from '../../components/confirm-dialog';

interface SemesterWeek {
    id: number;
    numberSemestr: number;
    countWeeks: number;
}

interface PlanCreationNodeProps {
    node: Node;
    semesters: Semester[];
    plans: Plan[];
    semestersWeeks: SemesterWeek[];
}

const useStyles = makeStyles({
    cell: {
        backgroundColor: lightGreen[400],
    },
    mainCell: {
        backgroundColor: blue[300],
    },
});

export const PlanCreationNode: React.FC<PlanCreationNodeProps> = ({
    node,
    semesters,
    plans,
    semestersWeeks,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentPlan = useSelector(selectCurrentPlan);

    const {
        editMode,
        setEditMode,
        entityData: nodeData,
        handleChangeEntityData: handleChangeNodeData,
        handleCancelClick,
        handleChangeNode,
    } = useEditMode(node);

    const [open, setOpen] = useState(false);
    const [ConfirmOpen, setConfirmOpen] = useState(false);

    // фильтрация семестров
    const associatedSemesters = semesters
        ?.filter((semester) => semester?.idNode?.id === node?.id)
        .sort((firstSeminar, secondSeminar) => firstSeminar?.number - secondSeminar?.number);
    const associatedSemestersNumber = associatedSemesters.map((semester) => semester?.number);

    const showSemesters = semestersWeeks.map((week) => {
        if (associatedSemestersNumber?.includes(week?.numberSemestr)) {
            return associatedSemesters.find(
                (associatedSemester) => associatedSemester?.number === week?.numberSemestr
            );
        } else {
            return { semesterNumber: week?.numberSemestr };
        }
    });

    // const associatedPlan = plans?.find((plan) => plan?.id === node?.idPlan?.id);

    const { totalExams, totalTests, totalRgrs, totalZe } =
        useCalculateTotalTests(associatedSemesters);
    const { totalClass, totalAuditore, totalPractice, totalLecture, totalLab, totalSeminar } =
        useCalculateTotalParams(associatedSemesters);

    const [currentSemesterNumber, setCurrentSemesterNumber] = useState(null);

    const handleCreateNewSemester = (semNumber) => {
        setOpen(true);
        setCurrentSemesterNumber(semNumber);
    };

    const handleDeleteNode = () => {
        // eslint-disable-next-line no-prototype-builtins
        if (showSemesters?.some((sem) => sem.hasOwnProperty('id'))) setConfirmOpen(true);
        else handleDeleteNodeOk();
    };
    const handleDeleteNodeOk = () => {
        // удаление ноды
        dispatch(deleteNode(node.id));
        dispatch(deleteSubject(nodeData?.idSubject?.id));
    };

    const subCompetencies = useSelector(selectSubCompetencies);
    const associatedCompetence = subCompetencies.find(
        (competence) => competence?.idSubject?.id === node?.idSubject?.id
    );

    const handleSaveNode = () => {
        // обновление ноды (дисциплины)
        dispatch(updateNode(nodeData, nodeData?.idSubject?.id, currentPlan));
        setEditMode(false);
    };

    return (
        <>
            <ConfirmDialog
                title="Предупреждение!"
                open={ConfirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={handleDeleteNodeOk}
            >
                Подтвердите удаление!
            </ConfirmDialog>

            <AddSemesterDialog
                open={open}
                setOpen={setOpen}
                node={node}
                currentSemesterNumber={currentSemesterNumber}
            />
            <TableRow>
                <TableCell align="center">
                    <Stack direction="row" alignItems="center">
                        {editMode ? (
                            <>
                                <IconButton onClick={handleSaveNode}>
                                    <DoneIcon style={{ color: green[600] }} />
                                </IconButton>
                                <IconButton onClick={handleCancelClick}>
                                    <DoDisturbIcon style={{ color: red[600] }} />
                                </IconButton>
                                <TextField
                                    name="nodeNumber"
                                    value={nodeData?.nodeNumber}
                                    onChange={handleChangeNodeData}
                                    size="small"
                                    style={{ width: 70, textAlign: 'center' }}
                                />
                            </>
                        ) : (
                            <>
                                <DeleteIcon onClick={handleDeleteNode} sx={{ color: red[500] }} />
                                <EditIcon onClick={() => setEditMode(true)} />
                                <Typography> {nodeData?.nodeNumber}</Typography>
                            </>
                        )}
                    </Stack>
                </TableCell>
                <TableCell align="center" className={classes.mainCell}>
                    {editMode ? (
                        <TextField
                            name="subjectName"
                            value={nodeData?.idSubject?.name}
                            onChange={handleChangeNode}
                            size="small"
                            style={{ width: 240, textAlign: 'center' }}
                        />
                    ) : (
                        <Typography>{nodeData?.idSubject?.name}</Typography>
                    )}
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

                {showSemesters?.map((semester: Semester, i: number) => {
                    return semester?.id ? (
                        semester?.courseWorkType !== null ? (
                            <PlanCreationSemesterWork
                                key={`${i}_${new Date().getTime()}`}
                                semester={semester}
                            />
                        ) : (
                            <PlanCreationSemester
                                key={`${i}_${new Date().getTime()}`}
                                semester={semester}
                            />
                        )
                    ) : (
                        <TableCell align="center">
                            <IconButton
                                onClick={() => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    //@ts-ignore
                                    handleCreateNewSemester(semester?.semesterNumber);
                                }}
                            >
                                <AddIcon />
                            </IconButton>
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
