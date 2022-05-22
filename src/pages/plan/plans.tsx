import React, { useRef, useState } from 'react';
import { Button, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { defaultColDef, defaultSize, defaultTheme, PREFIX } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { Plan, Speciality } from 'types';
import { useHistory } from 'react-router-dom';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { AddPlanDialog } from './add-plan-dialog';

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

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const plansColumns = [
        {
            field: 'id',
            width: 140,
        },
        {
            field: 'learnYear',
            width: 140,
        },
        {
            field: 'educationForm',
            width: 140,
        },
        {
            field: 'idSpeciality.name',
            width: 140,
            headerName: 'Speciality',
        },
    ];

    return (
        <>
            <AddPlanDialog open={open} setOpen={setOpen} />
            <OverviewHeader>
                <OverviewTitle>Plans</OverviewTitle>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Add plan
                </Button>
            </OverviewHeader>
            <div style={defaultSize} className={defaultTheme}>
                <AgGridReact
                    ref={gridRef}
                    modules={modules}
                    onCellClicked={(e) => history.push(`/${PREFIX}/plan-creation/${e.data?.id}`)}
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
