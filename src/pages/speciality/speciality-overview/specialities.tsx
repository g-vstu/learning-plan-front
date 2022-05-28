import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';
import { defaultColDef, defaultSize, defaultTheme } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { Speciality } from 'types';
import { useHistory } from 'react-router-dom';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { AddSpecialityDialog } from './add-speciality-dialog';

interface PropTypes {
    specialities: Speciality[];
}

export const Specialities: React.FC<PropTypes> = ({ specialities }) => {
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

    const specialititesColumns = [
        {
            field: 'shifr',
            width: 140,
            headerName: 'Шифр',
        },
        {
            field: 'name',
            width: 140,
            headerName: 'Название',
        },
    ];

    return (
        <>
            <AddSpecialityDialog open={open} setOpen={setOpen} />
            <OverviewHeader>
                <OverviewTitle>Специальности</OverviewTitle>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Добавить специальность
                </Button>
            </OverviewHeader>
            <div style={defaultSize} className={defaultTheme}>
                <AgGridReact
                    ref={gridRef}
                    modules={modules}
                    rowData={specialities}
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
