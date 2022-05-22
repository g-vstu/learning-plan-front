import React, { useEffect, useState } from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubjects } from 'store/subject/selectors';
import { selectPlans } from 'store/plan/selectors';
import { selectCurrentSpeciality } from 'store/speciality/selectors';
import { Node } from 'types';
import { createNode, createNodeWithNewSubject } from 'store/node/actions';
import { ExistSubjectForm } from './exist-subject-form';
import { NewSubjectForm } from './new-subject-form';
import { blue, green } from '@mui/material/colors';
import { FieldContainer } from 'components/field-container';

interface PropTypes {
    open: boolean;
    setOpen: (param: boolean) => void;
    nodes: Node[];
}

export const AddPlanDialog: React.FC<PropTypes> = ({ open, setOpen, nodes }) => {
    const dispatch = useDispatch();
    const [isNewSubject, setIsNewSubject] = useState(false);
    const speciality = useSelector(selectCurrentSpeciality);

    const plans = useSelector(selectPlans);
    const associatedPlan = plans?.find((plan) => plan?.idSpeciality?.id === speciality?.id);

    const subjects = useSelector(selectSubjects);

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [newNodeNumber, setNewNodeNumber] = useState('');

    const handleChangeType = (e) => {
        setSelectedSubject(e.target.value as any);
    };

    const hanldeChangeSubjectMode = () => {
        setIsNewSubject(!isNewSubject);
    };

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

    const handleChangeTypeUnit = (e) => {
        setUnit(e.target.value as any);
    };

    const hanldeAddSubjectToPlan = () => {
        const checkFiltered = nodes?.some((node) => node?.idSubject?.id === selectedSubject);
        if (!isNewSubject) {
            if (!checkFiltered) {
                const node = {
                    idCathedra: 1,
                    nodeNumber: newNodeNumber,
                };
                dispatch(createNode(node, selectedSubject, associatedPlan));
                setOpen(false);
            }
        }
        if (isNewSubject) {
            const node = {
                idCathedra: 1,
                nodeNumber: newNodeNumber,
            };
            dispatch(createNodeWithNewSubject(node, associatedPlan, newSubject, unit));
            setOpen(false);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                <DialogContent>
                    <Container style={{ marginTop: 0, paddingTop: 20, paddingBottom: 20 }}>
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
                                                Add subject
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
                                    <InputLabel>New subject?</InputLabel>
                                    <Switch
                                        checked={isNewSubject}
                                        onChange={hanldeChangeSubjectMode}
                                    />
                                    {isNewSubject ? (
                                        <Typography
                                            style={{
                                                fontWeight: 600,
                                                marginLeft: 10,
                                                color: green[500],
                                            }}
                                        >
                                            Yes
                                        </Typography>
                                    ) : (
                                        <Typography
                                            style={{
                                                fontWeight: 600,
                                                marginLeft: 10,
                                                color: blue[500],
                                            }}
                                        >
                                            No
                                        </Typography>
                                    )}
                                </FieldContainer>
                                {isNewSubject ? (
                                    <NewSubjectForm
                                        newNodeNumber={newNodeNumber}
                                        setNewNodeNumber={setNewNodeNumber}
                                        newSubject={newSubject}
                                        handleChange={handleChange}
                                        unit={unit}
                                        handleChangeTypeUnit={handleChangeTypeUnit}
                                    />
                                ) : (
                                    <ExistSubjectForm
                                        selectedSubject={selectedSubject}
                                        setNewNodeNumber={setNewNodeNumber}
                                        newNodeNumber={newNodeNumber}
                                        handleChangeType={handleChangeType}
                                    />
                                )}
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={hanldeAddSubjectToPlan}
                                >
                                    Add to plan
                                </Button>
                            </div>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};
