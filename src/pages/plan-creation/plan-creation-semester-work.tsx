import React, { useEffect, useState } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { TableEditCell } from './plan-creation-table/table-edit-cell';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useDispatch } from 'react-redux';
import { updateSemester } from 'store/semester/actions';
import { Semester } from 'types';
import { makeStyles } from '@mui/styles';
import { indigo, lightGreen } from '@mui/material/colors';
import { useEditMode } from 'hooks/useEditMode';

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

export const PlanCreationSemesterWork: React.FC<PropTypes> = ({ semester }) => {
    const dispatch = useDispatch();

    const {
        editMode,
        setEditMode,
        entityData: semesterData,
        handleChangeEntityData: handleUpdateSemester,
        handleCancelClick,
    } = useEditMode(semester);

    const [subTotal, setSubTotal] = useState(
        semesterData?.lecture + semesterData?.practice + semesterData?.laboratory
    );
    const [totalHours, setTotalHours] = useState(semesterData?.selfeducation + subTotal);

    useEffect(() => {
        setTotalHours(subTotal + semesterData?.selfeducation);
    }, [subTotal, semesterData?.selfeducation]);

    useEffect(() => {
        const result = semesterData?.lecture + semesterData?.practice + semesterData?.laboratory;
        setSubTotal(result);
    }, [semesterData]);

    const handleSaveSemester = () => {
        dispatch(updateSemester(semesterData));
        setEditMode(false);
    };

    return (
        <TableCell>
            <TableCell style={{ border: 'none' }}>
                {editMode ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <IconButton onClick={() => handleSaveSemester()}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelClick}>
                            <DoDisturbIcon />
                        </IconButton>
                    </div>
                ) : (
                    <IconButton onClick={() => setEditMode(true)}>
                        <EditIcon />
                    </IconButton>
                )}
            </TableCell>
            <TableCell padding="none" style={{ border: 'none' }}>
                <TableRow>
                    <TableCell align="center" size="small">
                        Часы
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                        Зачетные единицы
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableEditCell
                        editMode={editMode}
                        name="courceWorkHours"
                        value={semesterData?.courceWorkHours}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                    <TableEditCell
                        editMode={editMode}
                        name="courceWorkZe"
                        value={semesterData?.courceWorkZe}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                </TableRow>
            </TableCell>
        </TableCell>
    );
};
