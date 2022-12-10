import { IconButton, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useEditMode } from 'hooks/useEditMode';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { updateWeeksSemesters } from 'store/semester/actions';
import { useDispatch } from 'react-redux';

export const TableSemesterCell: React.FC<any> = ({ semesterWeek }) => {
    const {
        editMode,
        setEditMode,
        entityData: semesterWeeksData,
        handleChangeEntityData: handleChangeSemesterWeeksData,
        handleCancelClick,
    } = useEditMode(semesterWeek);
    const dispatch = useDispatch();

    const handleSaveСountWeeks = () => {
        dispatch(updateWeeksSemesters(semesterWeeksData));
        setEditMode(false);
    };
    return (
        <>
            <TableCell align="center">
                {editMode ? (
                    <>
                        <IconButton onClick={handleSaveСountWeeks}>
                            <DoneIcon style={{ color: green[600] }} />
                        </IconButton>
                        <IconButton onClick={handleCancelClick}>
                            <DoDisturbIcon style={{ color: red[600] }} />
                        </IconButton>
                        <TextField
                            name="countWeeks"
                            value={semesterWeeksData?.countWeeks}
                            onChange={handleChangeSemesterWeeksData}
                            size="small"
                            style={{ width: 70, textAlign: 'center' }}
                        />
                    </>
                ) : (
                    <>
                        <EditIcon onClick={() => setEditMode(true)} />
                        <Typography>
                            {semesterWeek?.semsteerNumber} семестр ({semesterWeek?.countWeeks}{' '}
                            недель)
                        </Typography>
                    </>
                )}
            </TableCell>
        </>
    );
};
