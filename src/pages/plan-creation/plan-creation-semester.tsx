import React, { useEffect, useState } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { TableEditCell } from './plan-creation-table/table-edit-cell';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useDispatch } from 'react-redux';
import { updateSemester } from 'store/semester/actions';
import { Semester } from 'types';

interface PropTypes {
    semester: Semester;
}

export const PlanCreationSemester: React.FC<PropTypes> = ({ semester }) => {
    const dispatch = useDispatch();
    const [semesterData, setSemesterData] = useState(semester);
    const [editMode, setEditMode] = useState(false);
    const [isCanceledState, setIsCanceledState] = useState(false);

    useEffect(() => {
        setSemesterData(semester);
    }, [isCanceledState]);

    useEffect(() => {
        setSemesterData(semester);
    }, [semester]);

    const handleUpdateSemester = (e) => {
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
        <>
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
                    <TableCell>з.е</TableCell>
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
        </>
    );
};
