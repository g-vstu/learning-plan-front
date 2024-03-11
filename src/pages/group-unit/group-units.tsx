import React, { useCallback, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { defaultColDef, defaultSize, defaultTheme } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { GroupUnit } from 'types';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { AddGroupUnitDialog } from './add-group-unit-dialog';
import { Search as SearchIcon } from '@mui/icons-material';
import { ColDef } from '@ag-grid-community/core';
import { DeleteCell } from '../../components/delete-cell';
import { deleteGroupUnit } from 'store/group-unit/actions';

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

    const specialititesColumns: ColDef[] = [
        {
            field: 'name',
            width: 140,
            headerName: 'Имя',
        },
        {
            field: 'unitNumber',
            width: 140,
            headerName: 'Номер',
        },
        {
            field: 'idGroupComponents.name',
            width: 140,
            headerName: 'Компонент',
        },
        {
            width: 140,
            headerName: 'Удалить',
            cellRenderer: DeleteCell,
            cellRendererParams: ({ data }) => ({
                id: data.id,
                method: deleteGroupUnit,
            }),
        },
    ];

    const onFilterTextBoxChanged = useCallback(() => {
        (gridRef.current as any).api.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );
    }, []);

    return (
        <>
            <AddGroupUnitDialog open={open} setOpen={setOpen} />
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
                    <OverviewTitle>Модули</OverviewTitle>
                </div>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Добавить модуль
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
