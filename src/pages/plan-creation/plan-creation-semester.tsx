import React, { useEffect, useState } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { TableEditCell } from './plan-creation-table/table-edit-cell';
import { TableEditSelectCell } from './plan-creation-table/table-cell-edit-select';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSemester, updateSemester } from 'store/semester/actions';
import { makeStyles } from '@mui/styles';
import { indigo, lightGreen, red } from '@mui/material/colors';
import { useEditMode } from 'hooks/useEditMode';
import DeleteIcon from '@mui/icons-material/Delete';
import { Semester, SemesterType } from 'types';
import { selectWeeksSemesters } from 'store/semester/selectors';
import { perWeek } from 'helpers/calc-formulas';

interface PropTypes {
    semester: Semester;
}

const useStyles = makeStyles({
    cell: {
        backgroundColor: lightGreen[400],
    },
    hoursCell: {
        backgroundColor: indigo[50],
    },
});

export const PlanCreationSemester: React.FC<PropTypes> = ({ semester }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const semestersWeeks = useSelector(selectWeeksSemesters);

    const {
        editMode,
        setEditMode,
        entityData: semesterData,
        handleChangeEntityData: handleUpdateSemester,
        handleCancelClick,
    } = useEditMode(semester);

    const weeks = semestersWeeks.find(
        (week) => week.numberSemestr == semesterData.number
    ).countWeeks;
    const hoursPerWeek = {
        lk: perWeek(semesterData?.lecture, weeks),
        lb: perWeek(semesterData?.laboratory, weeks),
        sem: perWeek(semesterData?.seminar, weeks),
        pr: perWeek(semesterData.practice, weeks),
    };
    const [subTotal, setSubTotal] = useState(
        semesterData?.lecture +
            semesterData?.practice +
            semesterData?.laboratory +
            semesterData?.seminar
    );
    const [selfeducation, setSelfeducation] = useState(semesterData?.totalHours - subTotal);

    useEffect(() => {
        setSelfeducation(semesterData?.totalHours - subTotal);
    }, [subTotal, semesterData?.totalHours]);

    useEffect(() => {
        const result =
            semesterData?.lecture +
            semesterData?.practice +
            semesterData?.laboratory +
            semesterData?.seminar;
        setSubTotal(result);
    }, [semesterData]);

    const handleSaveSemester = () => {
        dispatch(updateSemester(semesterData));
        setEditMode(false);
    };
    return (
        <TableCell>
            <TableCell style={{ border: 'none', display: 'flex', justifyContent: 'center' }}>
                {editMode ? (
                    <div>
                        {console.log(semesterData, 'sem')}
                        <IconButton onClick={() => handleSaveSemester()}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelClick}>
                            <DoDisturbIcon />
                        </IconButton>
                    </div>
                ) : (
                    <>
                        <IconButton onClick={() => setEditMode(true)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                dispatch(deleteSemester(semester?.id));
                            }}
                        >
                            <DeleteIcon sx={{ color: red[500] }} />
                        </IconButton>
                    </>
                )}
            </TableCell>
            <TableCell padding="none" style={{ border: 'none' }}>
                <TableRow>
                    <TableCell align="center" size="small">
                        Итог
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                        Часы в нед.
                    </TableCell>
                    <TableCell align="center">Итог зв.</TableCell>
                    <TableCell align="center">РГР</TableCell>
                </TableRow>
                <TableRow>
                    <TableEditCell
                        editMode={editMode}
                        name="totalHours"
                        value={semesterData?.totalHours}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                    <TableCell align="center" className={classes.cell}>
                        {hoursPerWeek.lk}
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                        {hoursPerWeek.pr}
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                        {hoursPerWeek.sem}
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                        {hoursPerWeek.lb}
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                        {subTotal}
                    </TableCell>
                    <TableEditCell
                        editMode={editMode}
                        name="rgr"
                        value={semesterData?.rgr}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                </TableRow>
                <TableRow>
                    <TableCell align="center" className={classes.cell}>
                        {selfeducation}
                    </TableCell>
                    <TableEditCell
                        editMode={editMode}
                        name="lecture"
                        value={semesterData?.lecture}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                    <TableEditCell
                        editMode={editMode}
                        name="practice"
                        value={semesterData?.practice}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                    <TableEditCell
                        editMode={editMode}
                        name="seminar"
                        value={semesterData?.seminar}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                    <TableEditCell
                        editMode={editMode}
                        name="laboratory"
                        value={semesterData?.laboratory}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                    <TableEditSelectCell
                        editMode={editMode}
                        name="type"
                        value={semesterData?.type}
                        selItems={Object.values(SemesterType)}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                    <TableEditCell
                        editMode={editMode}
                        name="ze"
                        value={semesterData?.ze}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                </TableRow>
                <TableRow style={{ padding: 0 }}>
                    <TableCell padding="none" size="small">
                        самост
                    </TableCell>
                    <TableCell padding="none">лк</TableCell>
                    <TableCell padding="none">пр</TableCell>
                    <TableCell padding="none">сем</TableCell>
                    <TableCell padding="none">лб</TableCell>
                    <TableCell padding="none">атт</TableCell>
                    <TableCell padding="none">зе</TableCell>
                </TableRow>
            </TableCell>
        </TableCell>
    );
};
