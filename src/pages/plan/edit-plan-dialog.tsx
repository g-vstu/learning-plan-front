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
import { DIPLOM_TYPES, EDUCATION_FORMS, EDUCATION_LEVELS } from 'config/domain-consts';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import { updatePlan, getPlans } from 'store/plan/actions';

const useStyles = makeStyles({
    option: {
        '&:hover, &:focus, &.Mui-selected': {
            backgroundColor: '#e0e0ff', // Light blue color for selected option
            color: '#000', // Optional: Change text color if needed
        },
    },
});
export const EditPlanDialog: React.FC<any> = ({
    specializations,
    directions,
    groups,
    openEdit,
    setOpenEdit,
    rowData,
    setRowData,
}) => {
    const dispatch = useDispatch();
    const specialities = useSelector(selectSpecialities);

    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    const [selectedSpecializations, setSelectedSpecializations] = useState([]);
    // const [newPlan, setNewPlan] = useState({
    //     diplomCountWeek: 0,
    //     diplomIdSemestr: 0,
    //     diplomName: '',
    //     diplomZe: 0,
    //     educationForm: EDUCATION_FORMS[0],
    //     govExam: 0,
    //     learnYear: '',
    //     name: '',
    //     regNumber: '',
    //     utvDate: '2022-05-22',
    //     semesterCount: 8,
    //     educationLevel: EDUCATION_LEVELS[0],
    //     group: null,
    //     idSpeciality: null,
    //     directions: [],
    //     specializations: [],
    // });
    const handleGroupChange = (e, value) => {
        setRowData({
            ...rowData,
            ['group']: { id: value.value, name: value.label },
        });
    };
    const handleDirectionChange = (e, value) => {
        setRowData({
            ...rowData,
            ['directions']: [{ direction: { id: value.value, name: value.label } }],
        });
    };
    const handleSpecializationsChange = (e, value) => {
        setSelectedSpecializations(value);
        setRowData({
            ...rowData,
            ['specializations']: value.map((item) => ({
                specialization: { id: item.value, name: item.label },
            })),
        });
    };

    const handlePlanChange = (e) => {
        setRowData({
            ...rowData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeType = (e) => {
        setSelectedSpeciality(e.target.value as any);
        setRowData({
            ...rowData,
            [e.target.name]: { id: e.target.value },
        });
    };

    const handleEditPlan = () => {
        dispatch(updatePlan(rowData, rowData.idSpeciality.id));
        dispatch(getPlans());
        setOpenEdit(false);
    };

    return (
        <>
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md" fullWidth>
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
                                                Редактировать план
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
                                                <IconButton onClick={() => setOpenEdit(false)}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Специальность</Typography>
                                    <Select
                                        fullWidth
                                        size="small"
                                        name="idSpeciality"
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
                                    <Typography>Направление</Typography>
                                    <Autocomplete
                                        className="autocompleteCustom"
                                        options={directions
                                            .map((item) => ({
                                                value: item.id,
                                                label: item.name,
                                            }))
                                            .sort((a, b) => a.label.localeCompare(b.label))}
                                        onChange={(e, value) => handleDirectionChange(e, value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                InputLabelProps={{ shrink: false }}
                                            />
                                        )}
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Специализация</Typography>
                                    <Autocomplete
                                        multiple={true}
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        options={specializations
                                            .map((item) => ({
                                                value: item.id,
                                                label: item.name,
                                            }))
                                            .sort((a, b) => a.label.localeCompare(b.label))}
                                        onChange={(e, value) =>
                                            handleSpecializationsChange(e, value)
                                        }
                                        disableCloseOnSelect
                                        defaultValue={selectedSpecializations}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                InputLabelProps={{ shrink: false }}
                                            />
                                        )}
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Группа</Typography>
                                    <Autocomplete
                                        className="autocompleteCustom"
                                        options={groups
                                            .map((item) => ({
                                                value: item.id,
                                                label: item.name,
                                            }))
                                            .sort((a, b) => a.label.localeCompare(b.label))}
                                        onChange={(e, value) => handleGroupChange(e, value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                InputLabelProps={{ shrink: false }}
                                            />
                                        )}
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Недели диплома</Typography>
                                    <TextField
                                        name="diplomCountWeek"
                                        type="number"
                                        required
                                        value={rowData.diplomCountWeek}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Семестр диплома</Typography>
                                    <TextField
                                        name="diplomIdSemestr"
                                        required
                                        value={rowData.diplomIdSemestr}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Тип диплома</Typography>
                                    <Select
                                        name="diplomName"
                                        required
                                        value={rowData.diplomName}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    >
                                        {DIPLOM_TYPES?.map((form, i) => (
                                            <MenuItem key={i} value={form}>
                                                {form}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Диплом зе</Typography>
                                    <TextField
                                        name="diplomZe"
                                        required
                                        value={rowData.diplomZe}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>форма обучения</Typography>
                                    <Select
                                        name="educationForm"
                                        required
                                        value={rowData.educationForm}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    >
                                        {EDUCATION_FORMS?.map((form, i) => (
                                            <MenuItem key={i} value={form}>
                                                {form}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Уровень образования</Typography>
                                    <Select
                                        name="educationLevel"
                                        required
                                        value={rowData.educationLevel}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    >
                                        {EDUCATION_LEVELS?.map((form, i) => (
                                            <MenuItem key={i} value={form}>
                                                {form}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FieldContainer>
                                {/* <FieldContainer>
                                    <Typography>Год принятия</Typography>
                                    <TextField
                                        name="enrollmentYear"
                                        required
                                        value={newPlan.enrollmentYear}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer> */}
                                <FieldContainer>
                                    <Typography>ГЭК</Typography>
                                    <TextField
                                        name="govExam"
                                        required
                                        value={rowData.govExam}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Год обучения</Typography>
                                    <TextField
                                        name="learnYear"
                                        required
                                        value={rowData.learnYear}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Рег. №</Typography>
                                    <TextField
                                        name="regNumber"
                                        required
                                        value={rowData.regNumber}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Дата утверждения</Typography>
                                    <TextField
                                        name="utvDate"
                                        required
                                        value={rowData.utvDate}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Typography>Количество семестров</Typography>
                                    <TextField
                                        name="semesterCount"
                                        required
                                        type="number"
                                        value={rowData.semesterCount}
                                        onChange={handlePlanChange}
                                        fullWidth
                                        size="small"
                                    />
                                </FieldContainer>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <Button fullWidth onClick={handleEditPlan} variant="contained">
                                    Редактировать план
                                </Button>
                            </div>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};