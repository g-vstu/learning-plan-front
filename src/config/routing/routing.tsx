import { Layout } from 'components/layout';
import { PREFIX } from 'config/constants';
import React from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { renderRoutes } from './render-routes';
import AuthProvider from '../../hoc/AuthProvider';

export const createAppWithRouter = (App, getRoutes) => {
    return () => {
        const baseUrl = '/';
        const routeList = renderRoutes(getRoutes(PREFIX));
        return (
            <BrowserRouter>
                <AuthProvider>
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
                </AuthProvider>
            </BrowserRouter>
        );
    };
};
