import { TableCell, TextField, Typography } from '@mui/material';
import React from 'react';

export const TableEditCell: React.FC<any> = ({ editMode, value, name }) => {
    return (
        <TableCell>
            {editMode ? (
                <TextField
                    name={name}
                    value={value}
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
