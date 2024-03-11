import { Layout } from 'components/layout';
import { PREFIX } from 'config/constants';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { renderRoutes } from './render-routes';

export const createAppWithRouter = (App, getRoutes) => {
    return () => {
        const baseUrl = '/';
        const routeList = renderRoutes(getRoutes(PREFIX));
        return (
            <BrowserRouter>
                <Layout>
                    <Route
                        path={baseUrl}
                        render={(routeProps) => (
                            <App {...routeProps}>
                                <Switch>{routeList}</Switch>
                            </App>
                        )}
                    />
                </Layout>
            </BrowserRouter>
        );
    };
};
