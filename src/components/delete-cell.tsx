import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { red } from '@mui/material/colors';

export const DeleteCell: React.FC<{
    id: number;
    method: (id: number) => void;
    faculty: { dean: string } | null;
}> = ({ id, method, faculty }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        const result = confirm('Вы действительно хотите удалить?');
        if (result) {
            const resultConfirm = confirm('Вы точно уверены?');
            if (resultConfirm) {
                dispatch(method(id));
            }
        }
    };

    if (faculty) {
        if (faculty.dean !== JSON.parse(localStorage.getItem('user')).fio) {
            return null;
        }
    }

    return (
        <>
            <DeleteIcon onClick={handleDelete} sx={{ color: red[500] }} />
        </>
    );
};
