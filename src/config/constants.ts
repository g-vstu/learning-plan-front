import { ColDef } from '@ag-grid-community/core';

export const DEVELOPMENT = process.env.REACT_APP_STUDENT_PLAN_API;

export const PREFIX = process.env.REACT_APP_PREFIX;

export const defaultTheme = 'ag-theme-alpine';

export const defaultSize = {
    height: 700,
    width: '100%',
};

export const defaultColDef: ColDef = {
    // Enterprise version only
    // enableRowGroup: true,
    // enablePivot: true,
    // enableValue: true,
    // width: 100,
    sortable: true,
    resizable: true,
    filter: true,
    //flex: 1,
};
const user = localStorage.getItem('user');
const token = user ? JSON.parse(user).access_token : undefined;

export const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};
