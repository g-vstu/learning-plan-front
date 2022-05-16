import App from 'App';
import { PlanCreationContanier } from 'containers/plan-creation';

export const getRoutes = (PREFIX: string) => [
    {
        path: `/${PREFIX}/plan-creation`,
        exact: true,
        component: PlanCreationContanier,
    },
];
