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
import { FieldContainer } from 'components/field-container';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompetencies } from 'store/competence/selectors';
import { createSubCompetence } from 'store/sub-competence/actions';
import { selectSubjects } from 'store/subject/selectors';

export const AddCompetenceDialog: React.FC<any> = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const subjects = useSelector(selectSubjects);

    const [newSubCompetence, setNewSubCompetence] = useState({
        nameCompetence: '',
        shifrCompetence: '',
    });

    const [selectedSubject, setSelectedSubject] = useState(null);

    const handleChange = (e) => {
        setNewSubCompetence({
            ...newSubCompetence,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeType = (e) => {
        setSelectedSubject(e.target.value as any);
    };

    const handleAddSubCompetence = () => {
        dispatch(createSubCompetence(newSubCompetence, selectedSubject));
        setOpen(false);
    };

    return (
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
                                            Компетенции
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
                                <Typography>Компетенция</Typography>
                                <TextField
                                    name="nameCompetence"
                                    value={newSubCompetence.nameCompetence}
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Typography>Шифр</Typography>
                                <TextField
                                    name="shifrCompetence"
                                    value={newSubCompetence.shifrCompetence}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Typography>Выберете предмет</Typography>
                                <Select
                                    fullWidth
                                    size="small"
                                    value={selectedSubject}
                                    onChange={handleChangeType}
                                >
                                    {subjects?.map((speciality) => (
                                        <MenuItem key={speciality?.id} value={speciality?.id}>
                                            {speciality?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FieldContainer>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <Button fullWidth onClick={handleAddSubCompetence} variant="contained">
                                Добавить компетенцию
                            </Button>
                        </div>
                    </div>
                </Container>
            </DialogContent>
        </Dialog>
    );
};
