import React, { useState } from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogContent,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { FieldContainer } from 'components/field-container';
import { createSpeciality } from 'store/speciality/actions';

export const AddSpecialityDialog: React.FC<any> = ({ open, setOpen, groupUnits }) => {
    const dispatch = useDispatch();
    const [newSpeciality, setNewSpeciality] = useState({
        name: '',
        shifr: '',
    });

    const [newPlan, setNewPlan] = useState({
        diplomC2ountWeek: 0,
        diplomIdSemestr: 0,
        diplomName: '',
        diplomZe: 0,
        educationForm: 'очная',
        enrollmentYear: '2022-05-22',
        govExam: 0,
        learnYear: '',
        name: '',
        regNumber: '',
        utvDate: '2022-05-22',
    });

    const handleChange = (e) => {
        setNewSpeciality({
            ...newSpeciality,
            [e.target.name]: e.target.value,
        });
    };

    const handlePlanChange = (e) => {
        setNewPlan({
            ...newPlan,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddSpeciality = () => {
        dispatch(createSpeciality(newSpeciality, newPlan));
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
                                                Add speciality
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
                                    <Typography>Name</Typography>
                                    <TextField
                                        name="name"
                                        value={newSpeciality.name}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Shifr</Typography>
                                    <TextField
                                        name="shifr"
                                        value={newSpeciality.shifr}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <Divider />
                                <FieldContainer>
                                    <Typography>Plan form</Typography>
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Diplom weeks</Typography>
                                    <TextField
                                        name="diplomC2ountWeek"
                                        value={newPlan.diplomC2ountWeek}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Id semester</Typography>
                                    <TextField
                                        name="diplomIdSemestr"
                                        value={newPlan.diplomIdSemestr}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Diplom name</Typography>
                                    <TextField
                                        name="diplomName"
                                        value={newPlan.diplomName}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Diplom ZE</Typography>
                                    <TextField
                                        name="diplomZe"
                                        value={newPlan.diplomZe}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Education Form</Typography>
                                    <TextField
                                        name="educationForm"
                                        value={newPlan.educationForm}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Enrollment Year</Typography>
                                    <TextField
                                        name="enrollmentYear"
                                        value={newPlan.enrollmentYear}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Gov Exam</Typography>
                                    <TextField
                                        name="govExam"
                                        value={newPlan.govExam}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Learn Year</Typography>
                                    <TextField
                                        name="learnYear"
                                        value={newPlan.learnYear}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Reg Number</Typography>
                                    <TextField
                                        name="regNumber"
                                        value={newPlan.regNumber}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Utv Date</Typography>
                                    <TextField
                                        name="utvDate"
                                        value={newPlan.utvDate}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <Button fullWidth onClick={handleAddSpeciality} variant="contained">
                                    Add Speciality
                                </Button>
                            </div>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};
