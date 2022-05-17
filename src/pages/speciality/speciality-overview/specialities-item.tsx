import React from 'react';
import { Table, TableCell, TableRow } from '@mui/material';
import { Speciality } from 'types';
import { useHistory } from 'react-router-dom';
import { PREFIX } from 'config/constants';

interface PropTypes {
    speciality: Speciality;
}

export const SpecialitiesItem: React.FC<PropTypes> = ({ speciality }) => {
    const history = useHistory();
    return (
        <>
            <TableRow onClick={() => history.push(`/${PREFIX}/plan-creation/${speciality?.id}`)}>
                <TableCell>{speciality?.id}</TableCell>
                <TableCell>{speciality?.shifr}</TableCell>
                <TableCell>{speciality?.name}</TableCell>
            </TableRow>
        </>
    );
};
