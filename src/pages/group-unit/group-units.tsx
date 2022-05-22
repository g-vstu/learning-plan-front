import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';
import { defaultColDef, defaultSize, defaultTheme, PREFIX } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { GroupUnit } from 'types';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { AddGroupUnitDialog } from './add-group-unit-dialog';

interface PropTypes {
    groupUnits: GroupUnit[];
}

export const GroupUnits: React.FC<PropTypes> = ({ groupUnits }) => {
    const { modules } = useAgGridModules();
    const gridRef = useRef();

    const [open, setOpen] = useState(false);

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const specialititesColumns = [
        {
            field: 'name',
            width: 140,
        },
        {
            field: 'unitNumber',
            width: 140,
        },
        {
            field: 'idGroupComponents.name',
            width: 140,
            headerName: 'Component',
        },
    ];

    return (
        <>
            <AddGroupUnitDialog open={open} setOpen={setOpen} />
            <OverviewHeader>
                <OverviewTitle>Group Units</OverviewTitle>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Add group unit
                </Button>
            </OverviewHeader>
            <div style={defaultSize} className={defaultTheme}>
                <AgGridReact
                    ref={gridRef}
                    modules={modules}
                    rowData={groupUnits}
                    enableRangeSelection={true}
                    columnDefs={specialititesColumns}
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
