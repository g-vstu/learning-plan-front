import { Reducer } from 'redux';
import { SemesterState } from 'types';
import { CREATE_SEMESTER, GET_SEMESTERS, GET_WEEKS_SEMESTERS } from './types';

const initialState: SemesterState = {
    semesters: [],
    currentSemester: null,
    weeksSemester: null,
    weeksSemesters: [],
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

        case CREATE_SEMESTER.success:
            return onCreateSemesterSuccess(state, action.payload);

        case GET_WEEKS_SEMESTERS.start:
            return onGetWeeksSemestersStart(state);
        case GET_WEEKS_SEMESTERS.success:
            return onGetWeeksSemestersSuccess(state, action.payload);
        case GET_WEEKS_SEMESTERS.failure:
            return onGetWeeksSemestersFailure(state, action.payload);

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

const onGetWeeksSemestersStart = (state: SemesterState): SemesterState => ({
    ...state,
    loading: true,
});

const onGetWeeksSemestersSuccess = (state: SemesterState, payload): SemesterState => {
    return {
        ...state,
        weeksSemesters: payload.weeksSemesters,
        loading: false,
    };
};

const onGetWeeksSemestersFailure = (state: SemesterState, payload): SemesterState => ({
    ...state,
    loading: false,
    error: payload.error,
});

const onCreateSemesterSuccess = (state: SemesterState, payload): SemesterState => {
    return {
        ...state,
        semesters: [...state.semesters, payload.newSemester],
    };
};

export default semesterReducer;
