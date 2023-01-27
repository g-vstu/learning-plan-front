import React, { useEffect, useState } from 'react';
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
import { selectGroupComponents } from 'store/group-component/selectors';
import { createGroupUnit } from 'store/group-unit/actions';
import { selectCurrentPlan } from 'store/plan/selectors';
import toast, { Toaster } from 'react-hot-toast';

export const AddGroupUnitDialog: React.FC<any> = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const groupComponents = useSelector(selectGroupComponents);
    const currentPlan = useSelector(selectCurrentPlan);

    const [newGroupUnit, setNewGroupUnit] = useState({
        name: '',
        unitNumber: '',
    });

    const [component, setComponent] = useState(null);

    const handleChange = (e) => {
        setNewGroupUnit({
            ...newGroupUnit,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeType = (e) => {
        setComponent(e.target.value as any);
    };

    const handleAddGroupUnit = () => {
        dispatch(
            createGroupUnit(
                {
                    ...newGroupUnit,
                    idPlana: currentPlan.id,
                },
                component
            )
        );
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
            <Toaster />
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
                                            Добавить модуль
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
                                <Typography>Название</Typography>
                                <TextField
                                    name="name"
                                    value={newGroupUnit.name}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Typography>Номер в плане</Typography>
                                <TextField
                                    name="unitNumber"
                                    value={newGroupUnit.unitNumber}
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <Typography>Выберете компонент</Typography>
                                <Select
                                    fullWidth
                                    size="small"
                                    value={component}
                                    onChange={handleChangeType}
                                >
                                    {groupComponents?.map((groupComponent) => (
                                        <MenuItem
                                            key={groupComponent?.id}
                                            value={groupComponent?.id}
                                        >
                                            {groupComponent?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FieldContainer>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <Button fullWidth onClick={handleAddGroupUnit} variant="contained">
                                Добавить модуль
                            </Button>
                        </div>
                    </div>
                </Container>
            </DialogContent>
        </Dialog>
    );
};
