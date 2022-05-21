import { TableCell, TextField, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import React from 'react';

export const TableEditCell: React.FC<any> = ({ editMode, value, name, handleUpdateSemester }) => {
    return (
        <TableCell size="small" style={{ backgroundColor: indigo[100] }}>
            {editMode ? (
                <TextField
                    name={name}
                    value={value}
                    onChange={(e) => {
                        handleUpdateSemester(e);
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
