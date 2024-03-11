import { Reducer } from 'redux';
import { SubCompetenceState } from 'types';
import { CREATE_SUB_COMPETENCE, GET_SUB_COMPETENCIES } from './types';

const initialState: SubCompetenceState = {
    subCompetencies: [],
    currentSubCompetence: null,
    loading: true,
    error: null,
};

const subCompetenceReducer: Reducer<SubCompetenceState> = (
    state: SubCompetenceState = initialState,
    action
) => {
    switch (action.type) {
        case GET_SUB_COMPETENCIES.start:
            return onGetSubCompetenceStart(state);
        case GET_SUB_COMPETENCIES.success:
            return onGetSubCompetenceSuccess(state, action.payload);
        case GET_SUB_COMPETENCIES.failure:
            return onGetSubCompetenceFailure(state, action.payload);

        case CREATE_SUB_COMPETENCE.success:
            return onCreateSubCompetenceSuccess(state, action.payload);

        default:
            return state;
    }
};

const onGetSubCompetenceStart = (state: SubCompetenceState): SubCompetenceState => ({
    ...state,
    loading: true,
});

const onGetSubCompetenceSuccess = (state: SubCompetenceState, payload): SubCompetenceState => {
    return {
        ...state,
        subCompetencies: payload.subCompetencies,
        loading: false,
    };
};

const onGetSubCompetenceFailure = (state: SubCompetenceState, payload): SubCompetenceState => ({
    ...state,
    loading: false,
    error: payload.error,
});

const onCreateSubCompetenceSuccess = (state: SubCompetenceState, payload): SubCompetenceState => {
    return {
        ...state,
        subCompetencies: [...state.subCompetencies, payload.subCompetence],
    };
};

export default subCompetenceReducer;
