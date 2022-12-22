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
import { addPractice } from 'store/practice/actions';
import { PRACTICE_TYPES } from 'config/domain-consts';

export const AddPracticeDialog: React.FC<any> = ({ open, setOpen, planId }) => {
    const dispatch = useDispatch();
    const [newPractice, setNewPractice] = useState({
        idSemestr: 4,
        type: PRACTICE_TYPES[0],
        name: '',
        countWeek: 4,
        ze: 6,
    });

    const handleChange = (e) => {
        setNewPractice({
            ...newPractice,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddPractice = () => {
        dispatch(addPractice(newPractice, planId));
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
                                                Добавить практику
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
                                    <Typography>Семестр</Typography>
                                    <TextField
                                        name="idSemestr"
                                        value={newPractice.idSemestr}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Тип практики</Typography>
                                    <Select
                                        name="type"
                                        value={newPractice.type}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    >
                                        {PRACTICE_TYPES.map((type, i) => (
                                            <MenuItem key={i} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Название</Typography>
                                    <TextField
                                        name="name"
                                        value={newPractice.name}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Количество недель</Typography>
                                    <TextField
                                        name="countWeek"
                                        value={newPractice.countWeek}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Зачётные единицы</Typography>
                                    <TextField
                                        name="ze"
                                        value={newPractice.ze}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <Button fullWidth onClick={handleAddPractice} variant="contained">
                                    Добавить парктику
                                </Button>
                            </div>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};
