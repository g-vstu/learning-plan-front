import { combineReducers } from 'redux';
import { Reducer } from 'redux';
import { SpecialityState } from 'types';
import speciality from './speciality/reducer';

export interface ApplicationState {
    speciality: SpecialityState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers({
    speciality,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
