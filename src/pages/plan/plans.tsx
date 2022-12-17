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
import { deleteSubject } from 'store/subject/actions';
import { delPlan } from 'store/plan/actions';

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

    const plansColumns = [
        {
            field: 'idSpeciality.name',
            width: 140,
            headerName: 'Специальность',
        },
        {
            field: 'learnYear',
            width: 140,
            headerName: 'Года обучения',
        },
        {
            field: 'educationForm',
            width: 140,
            headerName: 'Форма обучения',
        },
        {
            width: 10,
            headerName: 'Удалить',
            cellRenderer: DeleteCell,
            cellRendererParams: ({ data }) => ({
                id: data.id,
                method: onDeletePlan,
            }),
        },
        {
            width: 10,
            headerName: 'Удалить',
            cellRenderer: DeleteCell,
            cellRendererParams: ({ data }) => ({
                id: data.id,
                method: delPlan,
            }),
        },
    ];

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const onDeletePlan = ({ data }) => {
        const selectedRows = gridApi.api.getSelectedNodes();
        console.log('WWWWWWWWWW');
        console.log(selectedRows);
        delPlan(data);
    };
    
    const onOpenPlan = (id) => {
        //                  onCellClicked={(e) => history.push(`/${PREFIX}/plan-creation/${e.data?.id}`)}
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
                    headerHeight={40}
                    groupHeaderHeight={10}
                    suppressDragLeaveHidesColumns
                />
            </div>
        </>
    );
};
