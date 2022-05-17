import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { Speciality } from 'types';
import { SpecialitiesItem } from './specialities-item';

interface PropTypes {
    specialities: Speciality[];
}

export const Specialities: React.FC<PropTypes> = ({ specialities }) => {
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Shifr</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        {specialities.map((speciality) => (
                            <SpecialitiesItem key={speciality?.id} speciality={speciality} />
                        ))}
                    </TableHead>
                </Table>
            </TableContainer>
        </>
    );
};
