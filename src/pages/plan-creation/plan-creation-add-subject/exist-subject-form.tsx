import React from 'react';
import { MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSubjects } from 'store/subject/selectors';
import { FieldContainer } from 'components/field-container';

export const ExistSubjectForm: React.FC<any> = ({
    selectedSubject,
    setNewNodeNumber,
    handleChangeType,
    newNodeNumber,
}) => {
    const subjects = useSelector(selectSubjects);
    return (
        <>
            <FieldContainer>
                <Typography>Выберете предмет</Typography>
                <Select fullWidth size="small" value={selectedSubject} onChange={handleChangeType}>
                    {subjects?.map((subject) => (
                        <MenuItem key={subject?.id} value={subject?.id}>
                            {subject?.name}
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
