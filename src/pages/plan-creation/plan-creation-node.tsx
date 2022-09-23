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
    const currentPlan = useSelector(selectCurrentPlan);

    const [nodeData, setNodeData] = useState(node);

    useEffect(() => {
        setNodeData(node);
    }, [node]);

    const [editMode, setEditMode] = useState(false);
    const [isCanceledState, setIsCanceledState] = useState(false);

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
        setOpen(true);
    };

    const handleDeleteNode = () => {
        dispatch(deleteNode(node.idNode));
    };

    const addSemestersAmount = semestersWeeks?.length - associatedSemesters?.length;
    const emptyWeeksSemesers = semestersWeeks?.slice(semestersWeeks?.length - addSemestersAmount);

    const subCompetencies = useSelector(selectSubCompetencies);
    const associatedCompetence = subCompetencies.find(
        (competence) => competence?.idSubject?.id === node?.idSubject?.id
    );

    const handleChangeNodeData = (e) => {
        setNodeData({
            ...nodeData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveNode = () => {
        dispatch(updateNode(nodeData, nodeData?.idSubject?.id, currentPlan));
        setEditMode(false);
    };

    useEffect(() => {
        setNodeData(node);
    }, [isCanceledState]);

    return (
        <>
            <AddSemesterDialog open={open} setOpen={setOpen} node={node} maxNumber={maxNumber} />
            <TableRow>
                <TableCell align="center">
                    <Stack direction="row" alignItems="center">
                        {editMode ? (
                            <>
                                <IconButton onClick={handleSaveNode}>
                                    <DoneIcon style={{ color: green[600] }} />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        setEditMode(false);
                                        setIsCanceledState(!isCanceledState);
                                    }}
                                >
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
                            name="name"
                            value={nodeData?.idSubject?.name}
                            onChange={handleChangeNodeData}
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
