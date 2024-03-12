import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { defaultColDef, defaultSize, defaultTheme, PREFIX } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { Plan } from 'types';
import { useHistory } from 'react-router-dom';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { AddPlanDialog } from './add-plan-dialog';
import { EditPlanDialog } from './edit-plan-dialog';
import { Search as SearchIcon } from '@mui/icons-material';
import { DeleteCell } from 'components/delete-cell';
import { ExcelCell } from 'components/excel-cell';
import { delPlan, updatePlan } from 'store/plan/actions';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch } from 'react-redux';
import { DIPLOM_TYPES, EDUCATION_FORMS, EDUCATION_LEVELS, TEST } from 'config/domain-consts';
import 'config/styles/styles.css';
import { duplicatePlan } from 'store/plan/services';
import axios from 'axios';
import { CustomSelect } from '../../components/CustomSelect';
import Autocomplete from '@mui/material/Autocomplete';

interface PropTypes {
    plans: Plan[];
}

export const Plans: React.FC<PropTypes> = ({ plans }) => {
    const history = useHistory();
    const { modules } = useAgGridModules();
    const gridRef = useRef();

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [groups, setGroups] = useState([]);
    const [directions, setDirections] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [rowData, setRowData] = useState([]);

    const getDataGroups = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_STUDENT_PLAN_API}/groups`);
            setGroups(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getDataDirections = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_STUDENT_PLAN_API}/directions`
            );
            setDirections(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getDataSpecializations = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_STUDENT_PLAN_API}/specializations`
            );
            setSpecializations(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDataGroups();
        getDataDirections();
        getDataSpecializations();
    }, []);

    const dispatch = useDispatch();

    const specializationsCellRenderer = (params: { value: { name: string }[] }) => {
        console.log(params);
        return params.value.map(({ name }) => name).join(', ');
    };
    const handleRowClicked = (event) => {
        setRowData(event.data);
    };
    const plansColumns = [
        {
            width: 60,
            filter: false,
            headerName: 'Открыть',
            cellRenderer: ({ id }) => {
                const handleOpen = () => {
                    history.push(`/${PREFIX}/plan-creation/${id}`);
                };
                return <FileOpenOutlinedIcon onClick={handleOpen} />;
            },
            cellRendererParams: ({ data }) => ({
                id: data.id,
            }),
        },
        {
            field: 'idSpeciality.shifr',
            width: 150,
            headerName: 'Шифр',
        },
        {
            field: 'idSpeciality.name',
            width: 150,
            headerName: 'Специальность',
        },
        {
            field: 'specializations',
            width: 150,
            headerName: 'Специализация',
            // editable: true,
            cellRenderer: specializationsCellRenderer,
            // cellEditor: (params) => {
            //     return (
            //         <Autocomplete
            //             multiple={true}
            //             limitTags={2}
            //             id="multiple-limit-tags"
            //             options={specializations
            //                 .map((item) => ({
            //                     value: item.id,
            //                     label: item.name,
            //                 }))
            //                 .sort((a, b) => a.label.localeCompare(b.label))}
            //             // onChange={(e, value) => handleSpecializationsChange(e, value)}
            //             disableCloseOnSelect
            //             // defaultValue={params.value}
            //             renderInput={(params) => (
            //                 <TextField {...params} InputLabelProps={{ shrink: false }} />
            //             )}
            //         />
            //     );
            // },
        },
        {
            headerName: 'Группа',
            field: 'group.name',
            width: 150,
            editable: true,
            cellEditor: (params) => {
                const { value, data } = params;
                return (
                    <CustomSelect
                        onChange={(group) => {
                            data.group = group;
                        }}
                        groups={groups}
                        value={value}
                        params={params}
                    />
                );
            },
            filter: false,
        },
        {
            field: 'diplomCountWeek',
            width: 70,
            headerName: 'Недели диплома',
            editable: true,
            filter: false,
            cellEditor: 'agNumberCellEditor',
            cellEditorParams: {
                min: 0,
                max: 20,
            },
        },
        {
            field: 'diplomIdSemestr',
            width: 60,
            headerName: 'Семестр диплома',
            editable: true,
            filter: false,
        },
        {
            field: 'diplomName',
            width: 100,
            cellEditor: 'agSelectCellEditor',
            headerName: 'Тип диплома',
            editable: true,
            cellEditorParams: {
                values: DIPLOM_TYPES,
            },
            filter: false,
        },
        {
            field: 'diplomZe',
            width: 70,
            headerName: 'Диплом зе',
            editable: true,
            filter: false,
        },
        {
            field: 'group.yearStart',
            width: 100,
            headerName: 'Год поступления',
        },
        {
            field: 'govExam',
            width: 80,
            headerName: 'ГЭК',
            editable: true,
        },
        {
            field: 'utvDate',
            width: 160,
            headerName: 'Дата утверждения',
            editable: true,
        },
        {
            field: 'regNumber',
            width: 150,
            headerName: 'Рег. №',
            editable: true,
        },
        {
            field: 'learnYear',
            width: 150,
            headerName: 'Год обучения',
            editable: true,
        },
        {
            field: 'educationLevel',
            width: 180,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: EDUCATION_LEVELS,
            },
            headerName: 'Уровень образования',
            editable: true,
        },
        {
            field: 'educationForm',
            width: 100,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: EDUCATION_FORMS,
            },
            headerName: 'Форма обучения',
            editable: true,
        },
        {
            width: 60,
            filter: false,
            headerName: 'Удалить',
            cellRenderer: DeleteCell,
            cellRendererParams: ({ data }) => ({
                id: data.id,
                method: delPlan,
            }),
            cellStyle: () => {
                return { display: 'flex', alignItems: 'center' };
            },
        },
        {
            width: 60,
            filter: false,
            headerName: 'Дублировать',
            cellRenderer: ({ id }) => {
                const handleOpen = () => {
                    duplicatePlan(id)
                        .then((duplicatedPlan) => {
                            duplicatedPlan.regNumber += '_копия'; // надо отправить на бэк изменение
                            history.push(`/${PREFIX}/plan-creation/${duplicatedPlan.id}`);
                            console.log(duplicatedPlan);
                        })
                        .catch(() => {
                            console.log('not duplicated');
                        });
                };
                return <ContentCopyIcon onClick={handleOpen} />;
            },
            cellRendererParams: ({ data }) => ({
                id: data.id,
            }),
            cellStyle: () => {
                return { display: 'flex', alignItems: 'center' };
            },
        },
        {
            width: 60,
            filter: false,
            headerName: 'Excel',
            cellRenderer: ExcelCell,
            cellRendererParams: ({ data }) => ({
                id: data.id,
                shifr: data.idSpeciality.shifr,
            }),
            cellStyle: () => {
                return { display: 'flex', alignItems: 'center' };
            },
        },
    ];
    const onCellValueChanged = (event) => {
        console.log(event.data, 'event data');
        dispatch(updatePlan(event.data, event.data.idSpeciality.id));
    };
    const onCellEditingStopped = (event) => {
        console.log('Изменено:', event.data);
        dispatch(updatePlan(event.data, event.data.idSpeciality.id));
    };
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const onFilterTextBoxChanged = useCallback(() => {
        (gridRef.current as any).api.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );
    }, []);

    return (
        <>
            <AddPlanDialog
                specializations={specializations}
                directions={directions}
                groups={groups}
                openAdd={openAdd}
                setOpenAdd={setOpenAdd}
            />
            <EditPlanDialog
                specializations={specializations}
                directions={directions}
                groups={groups}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
                rowData={rowData}
                setRowData={setRowData}
            />
            <OverviewHeader>
                <div style={{ display: 'flex' }}>
                    <TextField
                        id="filter-text-box"
                        variant="outlined"
                        onInput={onFilterTextBoxChanged}
                        size="small"
                        style={{ marginRight: 15 }}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                        placeholder="Search"
                    />
                    <OverviewTitle>Планы</OverviewTitle>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Button variant="contained" onClick={() => setOpenEdit(true)}>
                        Редактировать план
                    </Button>
                    <Button variant="contained" onClick={() => setOpenAdd(true)}>
                        Добавить план
                    </Button>
                </div>
            </OverviewHeader>

            <div style={defaultSize} className={defaultTheme}>
                <AgGridReact
                    ref={gridRef}
                    modules={modules}
                    rowData={plans}
                    enableRangeSelection={true}
                    columnDefs={plansColumns}
                    defaultColDef={defaultColDef}
                    rowSelection={'single'}
                    onGridReady={onGridReady}
                    cacheQuickFilter={true}
                    isFullWidthCell={(rowNode) => rowNode.data.fullWidth}
                    suppressDragLeaveHidesColumns
                    onCellValueChanged={onCellValueChanged}
                    onCellEditingStopped={onCellEditingStopped}
                    headerHeight={140}
                    onRowClicked={handleRowClicked}
                />
            </div>
        </>
    );
};
