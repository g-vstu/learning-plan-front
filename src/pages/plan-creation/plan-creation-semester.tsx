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
    const [semesterData, setSemesterData] = useState(semester);
    const [editMode, setEditMode] = useState(false);
    const [isCanceledState, setIsCanceledState] = useState(false);

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

    useEffect(() => {
        setSemesterData(semester);
    }, [isCanceledState]);

    useEffect(() => {
        setSemesterData(semester);
    }, [semester]);

    const handleUpdateSemester = (e) => {
        console.log(semesterData);
        setSemesterData({
            ...semesterData,
            [e.target.name]: +e.target.value,
        });
    };

    const handleSaveSemester = () => {
        dispatch(updateSemester(semesterData));
        setEditMode(false);
    };

    return (
        <TableCell>
            <TableCell>
                {editMode ? (
                    <>
                        <IconButton onClick={() => handleSaveSemester()}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setEditMode(false);
                                setIsCanceledState(!isCanceledState);
                            }}
                        >
                            <DoDisturbIcon />
                        </IconButton>
                    </>
                ) : (
                    <IconButton onClick={() => setEditMode(true)}>
                        <EditIcon />
                    </IconButton>
                )}
            </TableCell>
            <TableCell padding="none">
                <TableRow>
                    <TableCell size="small">Итог</TableCell>
                    <TableCell colSpan={4}>Итог звонки</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.cell}>{totalHours}</TableCell>
                    <TableCell colSpan={4} className={classes.cell}>
                        {subTotal}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableEditCell
                        editMode={editMode}
                        name="selfeducation"
                        value={semesterData?.selfeducation}
                        handleUpdateSemester={handleUpdateSemester}
                    />
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
                </TableRow>
                <TableRow style={{ padding: 0 }}>
                    <TableCell padding="none" size="small">
                        самост
                    </TableCell>
                    <TableCell padding="none">лк</TableCell>
                    <TableCell padding="none">пр</TableCell>
                    <TableCell padding="none">сем</TableCell>
                    <TableCell padding="none">лб</TableCell>
                </TableRow>
            </TableCell>
            <TableCell padding="none">
                <TableRow>
                    <TableCell colSpan={3}>з.е</TableCell>
                </TableRow>
                <TableRow>
                    <TableEditCell
                        editMode={editMode}
                        name="ze"
                        value={semesterData?.ze}
                        handleUpdateSemester={handleUpdateSemester}
                    />
                </TableRow>
            </TableCell>
        </TableCell>
    );
};
