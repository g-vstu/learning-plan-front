import React, { useRef, useState } from 'react';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { defaultColDef, defaultSize, defaultTheme, PREFIX } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { Plan, Practice } from 'types';
import { Button, TextField } from '@mui/material';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { DeleteCell } from 'components/delete-cell';
import { deletePractice, updatePractice } from 'store/practice/actions';
import { AddPracticeDialog } from './add-practice-dialog';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();
    const practiceColumns = [
        {
            field: 'idSemestr',
            width: 140,
            headerName: 'Семестр',
            editable: true,
        },
        {
            field: 'name',
            width: 140,
            headerName: 'Название',
            editable: true,
        },
        {
            field: 'countWeek',
            width: 140,
            headerName: 'Количество недель',
            editable: true,
        },
        {
            field: 'ze',
            width: 140,
            headerName: 'З.е.',
            editable: true,
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
    const onCellValueChanged = (event) => {
        dispatch(updatePractice(event.data));
    };
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
                    columnDefs={practiceColumns}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    isFullWidthCell={(rowNode) => rowNode.data.fullWidth}
                    headerHeight={40}
                    groupHeaderHeight={10}
                    suppressDragLeaveHidesColumns
                    onCellValueChanged={onCellValueChanged}
                />
            </div>
        </>
    );
};
