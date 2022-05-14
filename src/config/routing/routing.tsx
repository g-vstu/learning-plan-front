import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { renderRoutes } from './render-routes';

export function createAppWithRouter(App, getRoutes) {
    return () => {
        const baseUrl = '/';
        const routeList = renderRoutes(getRoutes(baseUrl));
        return (
            <BrowserRouter>
                <Route
                    path={baseUrl}
                    render={(routeProps) => (
                        <App {...routeProps}>
                            <Switch>{routeList}</Switch>
                        </App>
                    )}
                />
            </BrowserRouter>
        );
    };
}