import { Reducer } from 'redux';
import { SubjectState } from 'types';
import { GET_SUBJECTS } from './types';

const initialState: SubjectState = {
    subjects: [],
    currentSubject: null,
    loading: true,
    error: null,
};

const subjectReducer: Reducer<SubjectState> = (state: SubjectState = initialState, action) => {
    switch (action.type) {
        case GET_SUBJECTS.start:
            return onGetSubjectsStart(state);
        case GET_SUBJECTS.success:
            return onGetSubjectsSuccess(state, action.payload);
        case GET_SUBJECTS.failure:
            return onGetSubjectsFailure(state, action.payload);

        default:
            return state;
    }
};

const onGetSubjectsStart = (state: SubjectState): SubjectState => ({
    ...state,
    loading: true,
});

const onGetSubjectsSuccess = (state: SubjectState, payload): SubjectState => {
    return {
        ...state,
        subjects: payload.subjects,
        loading: false,
    };
};

const onGetSubjectsFailure = (state: SubjectState, payload): SubjectState => ({
    ...state,
    loading: false,
    error: payload.error,
});

export default subjectReducer;
