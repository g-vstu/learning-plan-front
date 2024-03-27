import React from 'react';
import { Route } from 'react-router-dom';

interface RouteProps {
    key: string;
    path: string;
    exact: boolean;
    component?: () => any;
    render?: () => any;
}

export const renderRoutes = (routes) => {
    return routes.map((route) => {
        const routeProps: RouteProps = {
            key: route.path,
            path: route.path,
            exact: route.exact,
        };

        if (route.render) {
            routeProps.render = route.render;
        } else {
            routeProps.component = route.component;
        }
        return <Route key={route.key} {...routeProps} />;
    });
};
