import { Reducer } from 'redux';
import { SemesterState } from 'types';
import {
    CREATE_SEMESTER,
    CREATE_WEEKS_SEMESTERS,
    DELETE_SEMESTER,
    GET_SEMESTERS,
    GET_WEEKS_SEMESTERS,
    UPDATE_SEMESTER,
    UPDATE_WEEKS_SEMESTERS,
} from './types';

const initialState: SemesterState = {
    semesters: [],
    currentSemester: null,
    weeksSemester: null,
    weeksSemesters: [],
    loading: true,
    weeksLoading: true,
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
        case UPDATE_SEMESTER.success:
            return onUpdateSemesterSuccess(state, action.payload);
        case DELETE_SEMESTER.success:
            return onDeleteSemester(state, action.payload);

        case GET_WEEKS_SEMESTERS.start:
            return onGetWeeksSemestersStart(state);
        case GET_WEEKS_SEMESTERS.success:
            return onGetWeeksSemestersSuccess(state, action.payload);
        case GET_WEEKS_SEMESTERS.failure:
            return onGetWeeksSemestersFailure(state, action.payload);
        case UPDATE_WEEKS_SEMESTERS.success:
            return onUpdateWeeksSemesterSuccess(state, action.payload);
        case CREATE_WEEKS_SEMESTERS.success:
            return onCreateWeeksSemesterSuccess(state, action.payload);

        default:
            return state;
    }
};

const onGetWeeksSemestersStart = (state: SemesterState): SemesterState => ({
    ...state,
    weeksLoading: true,
});

const onGetWeeksSemestersSuccess = (state: SemesterState, payload): SemesterState => {
    return {
        ...state,
        weeksSemesters: payload.weeks,
        weeksLoading: false,
    };
};

const onGetWeeksSemestersFailure = (state: SemesterState, payload): SemesterState => ({
    ...state,
    weeksLoading: false,
    error: payload.error,
});

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

const onCreateSemesterSuccess = (state: SemesterState, payload): SemesterState => {
    return {
        ...state,
        semesters: [...state.semesters, payload.newSemester],
    };
};

const onCreateWeeksSemesterSuccess = (state: SemesterState, payload): SemesterState => {
    return {
        ...state,
        weeksSemesters: [...state.weeksSemesters, payload.newWeeksSemester],
    };
};

const onUpdateSemesterSuccess = (state: SemesterState, payload): SemesterState => {
    const newSemesters = state.semesters.map((semester) => {
        if (semester?.id === payload.semester?.id) {
            return payload.semester;
        } else {
            return semester;
        }
    });
    return {
        ...state,
        semesters: newSemesters,
    };
};

const onUpdateWeeksSemesterSuccess = (state: SemesterState, payload): SemesterState => {
    const newWeeksSemester = state.weeksSemesters.map((semesterWeeks) => {
        if (semesterWeeks?.id === payload.weeks?.id) {
            return payload.weeks;
        } else {
            return semesterWeeks;
        }
    });
    return {
        ...state,
        weeksSemesters: newWeeksSemester,
    };
};

const onDeleteSemester = (state: SemesterState, paylod: { semesterId: number }): SemesterState => {
    const newSemesters = state.semesters.filter((semester) => semester?.id !== paylod.semesterId);

    return {
        ...state,
        semesters: newSemesters,
    };
};

export default semesterReducer;
