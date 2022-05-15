import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { init } from 'config';
import reducer from './store/index';
import { createAppWithRouter } from 'config/routing/routing';
import { getRoutes } from 'models';

init({
    reducer,
    MainApp: createAppWithRouter(App, getRoutes),
    middlewares: [],
});

reportWebVitals();
