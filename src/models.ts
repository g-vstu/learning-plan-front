import App from 'App';

export const getRoutes = (PREFIX: string) => [
    {
        path: `/${PREFIX}/`,
        exact: true,
        component: App,
    },
];
