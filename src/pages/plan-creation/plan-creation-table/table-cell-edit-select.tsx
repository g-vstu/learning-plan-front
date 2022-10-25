import React from 'react';
import { Select, TableCell, TextField, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import { SemesterType } from 'types';

export const TableEditSelectCell: React.FC<any> = ({
    editMode,
    value,
    selItems,
    name,
    handleUpdateSemester,
}) => {
    return (
        <TableCell align="center" size="small" style={{ backgroundColor: indigo[100] }}>
            {editMode ? (
                <Select
                    name={name}
                    type="string"
                    value={value}
                    onChange={(e) => {
                        handleUpdateSemester(e, false);
                    }}
                    size="small"
                    variant="standard"
                    style={{ width: 70, textAlign: 'center' }}
                >
                    <MenuItem value={SemesterType.Test}>{SemesterType.Test}</MenuItem>;
                    <MenuItem value={SemesterType.Exam}>{SemesterType.Exam}</MenuItem>;
                </Select>
            ) : (
                <Typography variant="subtitle2">{value}</Typography>
            )}
        </TableCell>
    );
};
