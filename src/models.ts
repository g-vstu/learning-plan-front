import App from 'App';
import { PlanCreationContanier } from 'containers/plan-creation';
import { SpecialitiesListContainer } from 'containers/speaciality-list';

export const getRoutes = (PREFIX: string) => [
    {
        path: `/${PREFIX}/plan-creation/:id`,
        exact: true,
        component: PlanCreationContanier,
    },
    {
        path: `/${PREFIX}/specialities`,
        exact: true,
        component: SpecialitiesListContainer,
    },
];
