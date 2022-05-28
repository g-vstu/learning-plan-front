import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';
import { defaultColDef, defaultSize, defaultTheme } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { GroupUnit, SubCompetence } from 'types';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { AddCompetenceDialog } from './add-competency-dialog';

interface PropTypes {
    subCompetencies: SubCompetence[];
}

export const Competencies: React.FC<PropTypes> = ({ subCompetencies }) => {
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
            field: 'idCompetence.shifrCompetence',
            width: 140,
            headerName: 'Шифр',
        },
        {
            field: 'idCompetence.nameCompetence',
            width: 140,
            headerName: 'Название',
        },
        {
            field: 'idSubject.name',
            width: 140,
            headerName: 'Предмет',
        },
    ];

    return (
        <>
            <AddCompetenceDialog open={open} setOpen={setOpen} />
            <OverviewHeader>
                <OverviewTitle>Компетенции</OverviewTitle>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Добавить компетенцию
                </Button>
            </OverviewHeader>
            <div style={defaultSize} className={defaultTheme}>
                <AgGridReact
                    ref={gridRef}
                    modules={modules}
                    rowData={subCompetencies}
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
