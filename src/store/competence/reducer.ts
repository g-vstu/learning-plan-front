import { Reducer } from 'redux';
import { CompetenceState } from 'types/competence';
import { GET_COMPETENCIES } from './types';

const initialState: CompetenceState = {
    competencies: [],
    currentCompetence: null,
    loading: true,
    error: null,
};

const competenceReducer: Reducer<CompetenceState> = (
    state: CompetenceState = initialState,
    action
) => {
    switch (action.type) {
        case GET_COMPETENCIES.start:
            return onGetCompetenciesStart(state);
        case GET_COMPETENCIES.success:
            return onGetCompetenciesSuccess(state, action.payload);
        case GET_COMPETENCIES.failure:
            return onGetCompetenciesFailure(state, action.payload);

        default:
            return state;
    }
};

const onGetCompetenciesStart = (state: CompetenceState): CompetenceState => ({
    ...state,
    loading: true,
});

const onGetCompetenciesSuccess = (state: CompetenceState, payload): CompetenceState => {
    return {
        ...state,
        competencies: payload.competencies,
        loading: false,
    };
};

const onGetCompetenciesFailure = (state: CompetenceState, payload): CompetenceState => ({
    ...state,
    loading: false,
    error: payload.error,
});

export default competenceReducer;
