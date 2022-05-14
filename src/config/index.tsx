import ReactDOM from 'react-dom';
import React, { Suspense } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

export const init = ({ reducer, MainApp, middlewares = [] }) => {
    let store;

    runApp();

    function configureStore(initialState) {
        return createStore(
            reducer,
            initialState,
            composeWithDevTools(applyMiddleware(thunk, createLogger(), ...middlewares))
        );
    }

    async function runApp(initialState = {}) {
        store = configureStore(initialState);
        renderWithStore(store, MainApp);
    }

    function renderWithStore(store, App) {
        ReactDOM.render(
            <Provider store={store}>
                <Suspense fallback={<div>Loading...</div>}>
                    <App store={store} />
                </Suspense>
            </Provider>,
            document.getElementById('root')
        );
    }
};
