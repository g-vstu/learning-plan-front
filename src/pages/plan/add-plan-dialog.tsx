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
import { useDispatch, useSelector } from 'react-redux';
import { FieldContainer } from 'components/field-container';
import { createSpeciality } from 'store/speciality/actions';
import { selectSubjects } from 'store/subject/selectors';
import { createPlan } from 'store/plan/actions';
import { selectSpecialities } from 'store/speciality/selectors';

export const AddPlanDialog: React.FC<any> = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const specialities = useSelector(selectSpecialities);

    const [selectedSpeciality, setSelectedSpeciality] = useState(null);

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

    const handlePlanChange = (e) => {
        setNewPlan({
            ...newPlan,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeType = (e) => {
        setSelectedSpeciality(e.target.value as any);
    };

    const handleCreatePlan = () => {
        dispatch(createPlan(newPlan, selectedSpeciality));
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
                                                Add plan
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
                                    <Typography>Plan form</Typography>
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Select speciality</Typography>
                                    <Select
                                        fullWidth
                                        size="small"
                                        value={selectedSpeciality}
                                        onChange={handleChangeType}
                                    >
                                        {specialities?.map((speciality) => (
                                            <MenuItem key={speciality?.id} value={speciality?.id}>
                                                {speciality?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                                <Button fullWidth onClick={handleCreatePlan} variant="contained">
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
