import { Reducer } from 'redux';
import { SemesterState } from 'types';
import { GET_SEMESTERS } from './types';

const initialState: SemesterState = {
    semesters: [],
    currentSemester: null,
    loading: true,
    error: null,
};

const semesterReducer: Reducer<SemesterState> = (state: SemesterState = initialState, action) => {
    switch (action.type) {
        case GET_SEMESTERS.start:
            return onGetSemestersStart(state);
        case GET_SEMESTERS.success:
            return onGetSemestersSuccess(state, action.payload);
        case GET_SEMESTERS.failure:
            return onGetSemestersFailure(state, action.payload);

        default:
            return state;
    }
};

const onGetSemestersStart = (state: SemesterState): SemesterState => ({
    ...state,
    loading: true,
});

const onGetSemestersSuccess = (state: SemesterState, payload): SemesterState => {
    return {
        ...state,
        semesters: payload.semesters,
        loading: false,
    };
};

const onGetSemestersFailure = (state: SemesterState, payload): SemesterState => ({
    ...state,
    loading: false,
    error: payload.error,
});

export default semesterReducer;
