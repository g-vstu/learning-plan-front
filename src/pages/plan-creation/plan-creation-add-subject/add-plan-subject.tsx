import React, { useState } from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubjects } from 'store/subject/selectors';
import { selectCurrentPlan, selectPlans } from 'store/plan/selectors';
import { Node } from 'types';
import { createNode, createNodeWithNewSubject } from 'store/node/actions';
import { ExistSubjectForm } from './exist-subject-form';
import { NewSubjectForm } from './new-subject-form';
import { FieldContainer } from 'components/field-container';
import toast, { Toaster } from 'react-hot-toast';

interface PropTypes {
    open: boolean;
    setOpen: (param: boolean) => void;
    nodes: Node[];
}

const TABS = {
    EXISTING_SUBJECT: {
        label: 'Предмет',
        value: 'existingSubject',
        disabled: true,
    },
    NEW_SUBJECT: {
        label: 'Новый предмет',
        value: 'newSubject',
        disabled: false,
    },
};

export const AddPlanDialog: React.FC<PropTypes> = ({ open, setOpen, nodes }) => {
    const dispatch = useDispatch();
    const [isNewSubject, setIsNewSubject] = useState(true);
    const [tabValue, setTabValue] = useState(TABS.NEW_SUBJECT.value);

    const plans = useSelector(selectPlans);
    const currentPlan = useSelector(selectCurrentPlan);

    const subjects = useSelector(selectSubjects);

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [newNodeNumber, setNewNodeNumber] = useState('');

    const handleChangeType = (e) => {
        setSelectedSubject(e.target.value as any);
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
        setUnit(e.target.value as string);
    };

    const hanldeAddSubjectToPlan = () => {
        const checkFiltered = nodes?.some((node) => node?.idSubject?.id === selectedSubject);
        if (checkFiltered) {
            console.log('error');
        } else {
            if (!isNewSubject) {
                if (!checkFiltered) {
                    const node = {
                        idCathedra: 1,
                        nodeNumber: newNodeNumber,
                    };
                    dispatch(createNode(node, selectedSubject, currentPlan));
                    toast.success('Предмет добавлен!');
                    // setOpen(false);
                }
            }
            if (isNewSubject) {
                const node = {
                    idCathedra: 1,
                    nodeNumber: newNodeNumber,
                };
                dispatch(createNodeWithNewSubject(node, currentPlan, newSubject, unit));
                toast.success('Предмет добавлен!');
                //setOpen(false);
            }
        }
    };

    const onTabChange = (event, newValue) => {
        setTabValue(newValue);
        const reslut = newValue === TABS.EXISTING_SUBJECT.value ? false : true;
        setIsNewSubject(reslut);
    };

    return (
        <>
            <Toaster />
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                <Tabs value={tabValue} onChange={onTabChange} style={{ width: '100%' }}>
                    {Object.values(TABS).map((tab) => (
                        <Tab
                            {...tab}
                            key={tab.value}
                            style={{
                                fontWeight: 600,
                                width: '50%',
                                fontSize: 14,
                                marginTop: 15,
                            }}
                        />
                    ))}
                </Tabs>
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
                                {tabValue === TABS.EXISTING_SUBJECT.value && (
                                    <ExistSubjectForm
                                        selectedSubject={selectedSubject}
                                        setNewNodeNumber={setNewNodeNumber}
                                        newNodeNumber={newNodeNumber}
                                        handleChangeType={handleChangeType}
                                    />
                                )}
                                {tabValue === TABS.NEW_SUBJECT.value && (
                                    <NewSubjectForm
                                        newNodeNumber={newNodeNumber}
                                        setNewNodeNumber={setNewNodeNumber}
                                        newSubject={newSubject}
                                        handleChange={handleChange}
                                        unit={unit}
                                        handleChangeTypeUnit={handleChangeTypeUnit}
                                    />
                                )}
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={hanldeAddSubjectToPlan}
                                >
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
