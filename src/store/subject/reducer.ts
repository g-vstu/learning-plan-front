import { Reducer } from 'redux';
import { SubjectState } from 'types';
import { ADD_SUBJECT, DELETE_SUBJECT, GET_SUBJECTS } from './types';

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
        case DELETE_SUBJECT.success:
            return onDeleteSubject(state, action.payload);

        case ADD_SUBJECT.success:
            return onAddSubjectSuccess(state, action.payload);

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

const onAddSubjectSuccess = (state: SubjectState, payload): SubjectState => ({
    ...state,
    subjects: [...state.subjects, payload.subject],
});

const onDeleteSubject = (state: SubjectState, payload): SubjectState => ({
    ...state,
    subjects: state.subjects.filter((subject) => subject.id !== payload.id),
});

export default subjectReducer;
