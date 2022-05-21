import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { init } from 'config';
import reducer from './store/index';
import { createAppWithRouter } from 'config/routing/routing';
import { getRoutes } from 'models';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/core/dist/styles/ag-theme-material.css';

init({
    reducer,
    MainApp: createAppWithRouter(App, getRoutes),
    middlewares: [],
});

reportWebVitals();
