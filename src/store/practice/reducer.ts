import { Reducer } from 'redux';
import { PracticeState } from 'types';
import { GET_PRACTICES } from './types';

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

export default practiceReducer;
