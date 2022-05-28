import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';
import { defaultColDef, defaultSize, defaultTheme, PREFIX } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { Plan } from 'types';
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
            field: 'idSpeciality.name',
            width: 140,
            headerName: 'Специальность',
        },
    ];

    return (
        <>
            <AddPlanDialog open={open} setOpen={setOpen} />
            <OverviewHeader>
                <OverviewTitle>Планы</OverviewTitle>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Добавить план
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
