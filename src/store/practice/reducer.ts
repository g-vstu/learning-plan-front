import { Reducer } from 'redux';
import { Practice, PracticeState } from 'types';
import { CREATE_PRACTICE, DELETE_PRACTICE, GET_PRACTICES, UPDATE_PRACTICE } from './types';

const initialState: PracticeState = {
    practices: [],
    currentPractice: null,
    loading: true,
    error: null,
};

const practiceReducer: Reducer<PracticeState> = (state: PracticeState = initialState, action) => {
    switch (action.type) {
        case GET_PRACTICES.start:
            return onGetPracticesStart(state);
        case GET_PRACTICES.success:
            return onGetPracticesSuccess(state, action.payload);
        case GET_PRACTICES.failure:
            return onGetPracticesFailure(state, action.payload);
        case DELETE_PRACTICE.success:
            return onDeletePracticeSuccess(state, action.payload);

        case CREATE_PRACTICE.success:
            return onCreatePracticeSuccess(state, action.payload);
        case UPDATE_PRACTICE.success:
            return onUpdatePracticeSuccess(state, action.payload);

        default:
            return state;
    }
};

const onGetPracticesStart = (state: PracticeState): PracticeState => ({
    ...state,
    loading: true,
});

const onGetPracticesSuccess = (state: PracticeState, payload): PracticeState => {
    return {
        ...state,
        practices: payload.practices,
        loading: false,
    };
};

const onGetPracticesFailure = (state: PracticeState, payload): PracticeState => ({
    ...state,
    loading: false,
    error: payload.error,
});

const onCreatePracticeSuccess = (state: PracticeState, payload): PracticeState => {
    return {
        ...state,
        practices: [...state.practices, payload.newPractice],
    };
};

const onDeletePracticeSuccess = (state: PracticeState, payload): PracticeState => ({
    ...state,
    loading: false,
    practices: state.practices.filter((practice) => practice.id !== payload.id),
});

const onUpdatePracticeSuccess = (
    state: PracticeState,
    payload: { updatedPractice: Practice }
): PracticeState => {
    const newPractice = state.practices.map((practice) => {
        if (practice?.id === payload.updatedPractice?.id) {
            return payload.updatedPractice;
        } else {
            return practice;
        }
    });
    return {
        ...state,
        practices: newPractice,
    };
};

export default practiceReducer;
