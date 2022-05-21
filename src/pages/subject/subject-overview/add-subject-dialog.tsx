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
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addSubject } from 'store/subject/actions';

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
                    <Container>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignContent: 'space-between',
                            }}
                        >
                            <div>
                                <div>
                                    <Grid container>
                                        <Grid item xs={9}>
                                            <Typography fontWeight={700} variant="h5">
                                                Add subject from
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
                                </div>
                                <div>
                                    <Typography>Name</Typography>
                                    <TextField
                                        name="name"
                                        value={newSubject.name}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </div>
                                <div>
                                    <Typography>Shifr</Typography>
                                    <TextField
                                        name="shifr"
                                        value={newSubject.shifr}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </div>
                                <div>
                                    <Typography>Select group unit</Typography>
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
                                </div>
                            </div>

                            <div style={{ marginTop: 20 }}>
                                <Button fullWidth onClick={handleAddSubject} variant="contained">
                                    Add Subject
                                </Button>
                            </div>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};
