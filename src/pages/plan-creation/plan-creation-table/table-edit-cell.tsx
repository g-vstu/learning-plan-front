import { TableCell, TextField, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import React from 'react';

export const TableEditCell: React.FC<any> = ({ editMode, value, name, handleUpdateSemester }) => {
    return (
        <TableCell align="center" size="small" style={{ backgroundColor: indigo[100] }}>
            {editMode ? (
                <TextField
                    name={name}
                    type="number"
                    value={value}
                    onChange={(e) => {
                        handleUpdateSemester(e, true);
                    }}
                    size="small"
                    variant="standard"
                    style={{ width: 70, textAlign: 'center' }}
                />
            ) : (
                <Typography variant="subtitle2">{value}</Typography>
            )}
        </TableCell>
    );
};
