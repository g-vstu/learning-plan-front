import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { red } from '@mui/material/colors';

export const DeleteCell: React.FC<{ id: number; method: (id: number) => void }> = ({
    id,
    method,
}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(method(id));
    };
    return (
        <>
            <DeleteIcon onClick={handleDelete} sx={{ color: red[500] }} />
        </>
    );
};
