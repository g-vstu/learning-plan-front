import App from 'App';
import { PlanCreationContanier } from 'containers/plan-creation';
import { SpecialitiesListContainer } from 'containers/speaciality-list';
import { SubjectList } from 'containers/subject-list';

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
    {
        path: `/${PREFIX}/subjects`,
        exact: true,
        component: SubjectList,
    },
];
