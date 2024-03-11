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
    CerteficationState,
    PracticeState,
    SubCompetenceState,
} from 'types';
import speciality from './speciality/reducer';
import groupComponent from './group-component/reducer';
import groupUnit from './group-unit/reducer';
import subject from './subject/reducer';
import competence from './competence/reducer';
import plan from './plan/reducer';
import node from './node/reducer';
import semester from './semester/reducer';
import certefication from './certefication/reducer';
import practice from './practice/reducer';
import subCompetence from './sub-competence/reducer';
import { StudyProgramState } from 'types/study-program';
import studyProgram from './study-program/reducer';

export interface ApplicationState {
    speciality: SpecialityState;
    groupComponent: GroupComponentState;
    groupUnit: GroupUnitState;
    subject: SubjectState;
    competence: CompetenceState;
    plan: PlanState;
    node: NodeState;
    semester: SemesterState;
    certefication: CerteficationState;
    practice: PracticeState;
    subCompetence: SubCompetenceState;
    studyProgram: StudyProgramState;
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
    certefication,
    practice,
    subCompetence,
    studyProgram,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
