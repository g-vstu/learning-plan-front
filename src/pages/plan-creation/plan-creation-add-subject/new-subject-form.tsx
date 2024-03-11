import React, { useState } from 'react';
import { MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGroupUnits } from 'store/group-unit/selectors';
import { FieldContainer } from 'components/field-container';
import { selectCurrentPlan } from 'store/plan/selectors';

export const NewSubjectForm: React.FC<any> = ({
    newNodeNumber,
    setNewNodeNumber,
    newSubject,
    handleChange,
    unit,
    handleChangeTypeUnit,
}) => {
    const groupUnits = useSelector(selectGroupUnits);
    const currentPlan = useSelector(selectCurrentPlan);

    return (
        <>
            <FieldContainer>
                <Typography>Предмет</Typography>
                <TextField
                    name="name"
                    value={newSubject.name}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                />
            </FieldContainer>
            <FieldContainer>
                <Typography>Выберете модуль</Typography>
                <Select fullWidth size="small" value={unit?.id} onChange={handleChangeTypeUnit}>
                    {groupUnits
                        ?.filter((groupUnit) => groupUnit.idPlana === currentPlan.id)
                        .map((groupUnit) => (
                            <MenuItem key={groupUnit?.id} value={groupUnit?.id}>
                                {groupUnit?.name}
                            </MenuItem>
                        ))}
                </Select>
            </FieldContainer>
            <FieldContainer>
                <Typography>Номер в плане</Typography>
                <TextField
                    value={newNodeNumber}
                    onChange={(e) => setNewNodeNumber(e.target.value)}
                    fullWidth
                    size="small"
                />
            </FieldContainer>
        </>
    );
};
