import React, { useRef, useState } from 'react';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { defaultColDef, defaultSize, defaultTheme, PREFIX } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { Plan, Practice } from 'types';
import { Button, TextField } from '@mui/material';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { DeleteCell } from 'components/delete-cell';
import { deletePractice } from 'store/practice/actions';
import { AddPracticeDialog } from './add-practice-dialog';

interface PropTypes {
    practices: Practice[];
    currentPlan: Plan;
}

export const PracticeTable: React.FC<PropTypes> = ({ practices, currentPlan }) => {
    const { modules } = useAgGridModules();
    const gridRef = useRef();

    const [open, setOpen] = useState(false);

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const practiceColumns = [
        {
            field: 'idSemestr',
            width: 140,
            headerName: 'Семестр',
        },
        {
            field: 'name',
            width: 140,
            headerName: 'Название',
        },
        {
            field: 'countWeek',
            width: 140,
            headerName: 'Количество недель',
        },
        {
            field: 'ze',
            width: 140,
            headerName: 'З.е.',
        },

        {
            width: 140,
            headerName: 'Удалить',
            cellRenderer: DeleteCell,
            cellRendererParams: ({ data }) => ({
                id: data.id,
                method: deletePractice,
            }),
        },
    ];

    return (
        <>
            <AddPracticeDialog open={open} setOpen={setOpen} planId={currentPlan.id} />
            <OverviewHeader>
                <div style={{ display: 'flex' }}>
                    <OverviewTitle>Практики</OverviewTitle>
                </div>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Добавить парктику
                </Button>
            </OverviewHeader>

            <div style={defaultSize} className={defaultTheme}>
                <AgGridReact
                    ref={gridRef}
                    modules={modules}
                    rowData={practices}
                    enableRangeSelection={true}
                    columnDefs={practiceColumns}
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
