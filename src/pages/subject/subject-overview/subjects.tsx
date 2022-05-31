import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAgGridModules } from 'hooks/useAgGridModules';
import { defaultColDef, defaultSize, defaultTheme, PREFIX } from 'config/constants';
import { AgGridReact } from '@ag-grid-community/react';
import { GroupUnit, Subject } from 'types';
import { Button, TextField } from '@mui/material';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { AddSubjectDialog } from './add-subject-dialog';
import { Search as SearchIcon } from '@mui/icons-material';

interface PropTypes {
    subjects: Subject[];
    groupUnits: GroupUnit[];
}

export const Subjects: React.FC<PropTypes> = ({ subjects, groupUnits }) => {
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

    const subjectsColumns = [
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
        {
            field: 'idUnit.name',
            width: 140,
            headerName: 'Модуль',
        },
        {
            field: 'idUnit.idGroupComponents.name',
            width: 140,
            headerName: 'Компонент',
        },
    ];

    const onFilterTextBoxChanged = useCallback(() => {
        (gridRef.current as any).api.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );
    }, []);

    return (
        <>
            <AddSubjectDialog open={open} setOpen={setOpen} groupUnits={groupUnits} />
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
                     <OverviewTitle>Предметы</OverviewTitle>
                </div>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Добавить предмет
                </Button>
            </OverviewHeader>

            <div style={defaultSize} className={defaultTheme}>
                <AgGridReact
                    ref={gridRef}
                    modules={modules}
                    rowData={subjects}
                    enableRangeSelection={true}
                    columnDefs={subjectsColumns}
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
