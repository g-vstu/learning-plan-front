import { ColDef } from '@ag-grid-community/core';

export const DEVELOPMENT = process.env.REACT_APP_STUDENT_PLAN_API;
export const PREFIX = 'vstu';

export const defaultTheme = 'ag-theme-material';

export const defaultSize = {
    height: 780,
    width: '100%',
};

export const defaultColDef: ColDef = {
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    width: 100,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 80,
};
