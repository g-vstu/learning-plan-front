import React, { useCallback, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { defaultColDef, defaultSize, defaultTheme, PREFIX } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { Plan } from 'types';
import { useHistory } from 'react-router-dom';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { AddPlanDialog } from './add-plan-dialog';
import { Search as SearchIcon } from '@mui/icons-material';
import { DeleteCell } from 'components/delete-cell';
import { delPlan, updatePlan } from 'store/plan/actions';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { useDispatch } from 'react-redux';
import { DIPLOM_TYPES, EDUCATION_FORMS, EDUCATION_LEVELS } from 'config/domain-consts';
import 'config/styles/styles.css';

interface PropTypes {
    plans: Plan[];
}

export const Plans: React.FC<PropTypes> = ({ plans }) => {
    const history = useHistory();
    const { modules } = useAgGridModules();
    const gridRef = useRef();

    const [open, setOpen] = useState(false);

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const dispatch = useDispatch();

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
            field: 'idSpeciality.name',
            width: 200,
            headerName: 'Специальность',
        },
        {
            field: 'diplomCountWeek',
            width: 70,
            headerName: 'Недели диплома',
            editable: true,
            filter: false,
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
            width: 140,
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
            field: 'enrollmentYear',
            width: 100,
            headerName: 'Год поступления',
            editable: true,
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
            headerName: 'Года обучения',
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
            width: 20,
            filter: false,
            headerName: 'Удалить',
            cellRenderer: DeleteCell,
            cellRendererParams: ({ data }) => ({
                id: data.id,
                method: delPlan,
            }),
        },
    ];

    const onCellValueChanged = (event) => {
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
            <AddPlanDialog open={open} setOpen={setOpen} />
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
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Добавить план
                </Button>
            </OverviewHeader>
            <div style={defaultSize} className={defaultTheme}>
                <AgGridReact
                    ref={gridRef}
                    modules={modules}
                    rowData={plans}
                    enableRangeSelection={true}
                    columnDefs={plansColumns}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    cacheQuickFilter={true}
                    isFullWidthCell={(rowNode) => rowNode.data.fullWidth}
                    suppressDragLeaveHidesColumns
                    onCellValueChanged={onCellValueChanged}
                    headerHeight={140}
                />
            </div>
        </>
    );
};
