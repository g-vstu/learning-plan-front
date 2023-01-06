import React, { useState } from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addSubject } from 'store/subject/actions';
import { FieldContainer } from 'components/field-container';

export const AddSubjectDialog: React.FC<any> = ({ open, setOpen, groupUnits }) => {
    const dispatch = useDispatch();
    const [newSubject, setNewSubject] = useState({
        name: '',
        shifr: '',
    });
    const [unit, setUnit] = useState(null);

    const handleChange = (e) => {
        setNewSubject({
            ...newSubject,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeType = (e) => {
        setUnit(e.target.value as any);
    };

    const handleAddSubject = () => {
        dispatch(addSubject(newSubject, unit));
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                <DialogContent>
                    <Container style={{ marginTop: 0, paddingTop: 20, paddingBottom: 30 }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignContent: 'space-between',
                            }}
                        >
                            <div>
                                <FieldContainer>
                                    <Grid container>
                                        <Grid item xs={9}>
                                            <Typography fontWeight={700} variant="h5">
                                                Добавить предмет
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
                                                <IconButton onClick={() => setOpen(false)}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </FieldContainer>
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
                                    <Select
                                        fullWidth
                                        size="small"
                                        value={unit?.id}
                                        onChange={handleChangeType}
                                    >
                                        {groupUnits?.map((groupUnit) => (
                                            <MenuItem key={groupUnit?.id} value={groupUnit?.id}>
                                                {groupUnit?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FieldContainer>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <Button fullWidth onClick={handleAddSubject} variant="contained">
                                    Добавить предмет
                                </Button>
                            </div>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};
