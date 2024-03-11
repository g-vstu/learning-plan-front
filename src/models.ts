import App from 'App';
import { CompetenciesList } from 'containers/competencies-list';
import { GroupUnitsList } from 'containers/group-unit-list';
import { PlanCreationContanier } from 'containers/plan-creation';
import { PlansList } from 'containers/plan-list';
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
    {
        path: `/${PREFIX}/units`,
        exact: true,
        component: GroupUnitsList,
    },
    {
        path: `/${PREFIX}/plans`,
        exact: true,
        component: PlansList,
    },
    {
        path: `/${PREFIX}/competencies`,
        exact: true,
        component: CompetenciesList,
    },
];
