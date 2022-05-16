import { combineReducers } from 'redux';
import { Reducer } from 'redux';
import {
    GroupComponentState,
    GroupUnitState,
    NodeState,
    PlanState,
    SpecialityState,
    SubjectState,
    CompetenceState,
    SemesterState,
} from 'types';
import speciality from './speciality/reducer';
import groupComponent from './group-component/reducer';
import groupUnit from './group-unit/reducer';
import subject from './subject/reducer';
import competence from './competence/reducer';
import plan from './plan/reducer';
import node from './node/reducer';
import semester from './semester/reducer';

export interface ApplicationState {
    speciality: SpecialityState;
    groupComponent: GroupComponentState;
    groupUnit: GroupUnitState;
    subject: SubjectState;
    competence: CompetenceState;
    plan: PlanState;
    node: NodeState;
    semester: SemesterState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers({
    speciality,
    groupComponent,
    groupUnit,
    subject,
    competence,
    plan,
    node,
    semester,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
